import jwt from "jsonwebtoken";

import prismaClient from "../prismaClient.ts";
import { Router } from "express";
import { signUpSchema, signInSchema } from "../types";

const JWT_SECRET = "your_secret_key";
const router = Router();


// Sign-Up Route
router.post("/signup", async (req, res) => {
    console.log(req.body);
    const body = signUpSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(422).json({
            "message": "improper inputs"
        });
    }
    console.log("1")
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
    console.log(token)
    res.json({
        token: token,
        message: "Sign up successfull"
    });
});

// Sign-In Route
router.post("/signin", async (req, res) => {
    const body = signInSchema.safeParse(req.body);
    if (!body.success) {
        return res.status(422).json({
            "message": "improper inputs"
        });
    }
    const user = await prismaClient.user.findFirst({
        where: {
            username: body.data.username,
            password: body.data.password
        }
    });

    console.log(user?.id)

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


