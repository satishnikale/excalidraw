import express from "express";
import { Request, Response } from "express";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET, PORT } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import { CreateUserSchema, SignInSchema } from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
const app = express();
app.use(express.json());


app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
  }
  const hashedPassword = await bcrypt.hash(parsedData.data!.password, 5);
  try {
    await prismaClient.user.create({
      data: {
        email: parsedData.data?.email!,
        password: hashedPassword,
        name: parsedData.data?.password!,
      },
    });
  } catch (error) {
    res.json({
      message: "This username already exists.",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = SignInSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Invalide Inputs.",
    });
  }
  try {
    const dbUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data?.email
      },
    });
    if(!dbUser){
      res.json({message: "User not found."});
      return;
    }
    const match = bcrypt.compare(dbUser?.password, parsedData.data!.password);
    if(parsedData.data?.email != dbUser!.email && parsedData.data?.password != dbUser!.password){
        res.json({
            message: "Invalide Credentials."
        });
        return;
    }
    const token = jwt.sign(
      {
        userId: dbUser!.email,
      },
      JWT_SECRET
    );

    res.json({
      message: "You are Logged in",
      token: token,
    });
  } catch (error) {
    res.json({
        message: "Fail to Login."
    })
  }
});

app.post("/room", middleware, (req, res) => {
  res.json({
    message: "Hello this is from http server...",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "Hello this is from http server...",
  });
});

async function main() {
  app.listen(3000);
  console.log(`Listening on PORT ${PORT}`);
}
main();
