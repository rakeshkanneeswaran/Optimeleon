import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

import { createPojectSchema } from "../types";

const router = Router();

router.post("/", async (req, res) => {

    const parsedBody = createPojectSchema.safeParse(req.body);
    if (!parsedBody.success) {
        return res.status(404)
    }
    const project = prismaClient.project.create({
        data: {
            name: parsedBody.data.name,
            script: parsedBody.data.script
        }
    })

})