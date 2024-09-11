import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { signUpSchema, signInSchema } from "../types";

const JWT_SECRET = "your_secret_key";

const prismaClient = new PrismaClient();
const router = Router();


// Sign-Up Route
router.post("/signup", async (req, res) => {
    console.log(req.body);
    const body = signUpSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).send("Invalid input");
    }

    const userExists = await prismaClient.user.findFirst({
        where: {
            username: body.data.username
        }
    });

    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const user = await prismaClient.user.create({
        data: {
            username: body.data.username,
            password: body.data.password,
            name: body.data.name,
        }
    });

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({
        token: token,
        message: "Sign in successful"
    });
});

// Sign-In Route
router.post("/signin", async (req, res) => {
    const body = signInSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(400).send("Invalid input");
    }

    const user = await prismaClient.user.findFirst({
        where: {
            username: body.data.username,
            password: body.data.password // Plain text password (not recommended)
        }
    });

    if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET);
    res.json({
        token: token,
        message: "Sign in successful"
    });
});

export const userRotuer = router;


