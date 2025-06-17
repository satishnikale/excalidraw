import { z } from "zod";

export const CreateUserSchema = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(4),
    name: z.string().min(3)
});


export const SignInSchema = z.object({
    email: z.string().min(3).max(100),
    password: z.string().min(4),
});

export const CreateRoomSchema = z.object({
    name: z.string().min(3).max(20)
});
