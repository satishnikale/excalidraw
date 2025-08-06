import express from "express";
import { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { JWT_SECRET, PORT } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  CreateRoomSchema,
  CreateUserSchema,
  SignInSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";
const app = express();
app.use(express.json());
app.use(cors());

interface CustomRequest extends Request {
  userId: string;
}

app.post("/signup", async (req, res) => {
  const parsedData = CreateUserSchema.safeParse(req.body);
  if (!parsedData.success) {
    res.json({
      message: "Incorrect Inputs",
    });
  }
  const hashedPassword = await bcrypt.hash(parsedData.data!.password, 5);
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data?.email!,
        password: hashedPassword,
        name: parsedData.data?.name!,
      },
    });
    res.json({
      message: "User created successfully.",
      userId: user.id,
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
  const hashedPassword = await bcrypt.hash(parsedData.data!.password, 5);
  try {
    const dbUser = await prismaClient.user.findFirst({
      where: {
        email: parsedData.data?.email,
      },
    });
    if (!dbUser) {
      res.json({ message: "Wrong Credentials" });
      return;
    }
    const match = bcrypt.compare(dbUser.password, parsedData.data!.password);
    console.log("is matching password", match);
    if (!match || dbUser.email != parsedData.data?.email) {
      res.json({
        message: "Invalide Credentials.",
      });
      return;
    }
    const token = jwt.sign(
      {
        userId: dbUser!.id,
      },
      JWT_SECRET
    );

    res.json({
      message: "You are Logged in",
      userId: dbUser.id,
      token: token,
    });
  } catch (error) {
    res.json({
      message: "Fail to Login.",
    });
  }
});

app.post("/room", middleware, async (req, res) => {
  const parsedData = CreateRoomSchema.safeParse(req.body);
  if (!parsedData) {
    res.json({ message: "Invalide Inputs." });
    return;
  }
  // @ts-ignore
  const userId = req.userId;
  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data?.name!,
        adminId: userId,
      },
    });
    res.json({
      roomName: room.slug,
      roomId: room.id,
    });
  } catch (error) {
    res.json({
      message: "Failed to create Room Please try again.",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
  try {
    const roomId = Number(req.params.roomId);
    const message = await prismaClient.chat.findMany({
      where: {
        roomId: roomId,
      },
      orderBy: {
        id: "desc",
      },
      take: 1000,
    });
    res.json({
      message,
    });
  } catch (e) {
    res.json({
      messages: [],
    });
  }
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where: {
      slug,
    },
  });
  res.json({
    room,
  });
});

async function main() {
  app.listen(PORT);
  console.log(`Listening on PORT ${PORT}`);
}
main();
