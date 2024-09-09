import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createPojectSchema, updatePojectSchema } from "../types";

const prismaClient = new PrismaClient();
const JWT_SECRET = "your_secret_key";

const router = Router();

// POST route to create a project
router.post("/", async (req, res) => {
    console.log("somethig the hit the server")
    console.log(req.body);
    console.log(req.cookies);

    const parsedBody = createPojectSchema.safeParse(req.body);
    var token = req.headers.authorization;

    if (!parsedBody.success) {
        return res.status(400).send("Invalid input");
    }

    if (!token) {
        return res.status(401).send("Unauthorized");
    }


    // Remove the 'Bearer ' prefix from the token
    token = token.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded.id) {
            return res.status(403).send("Forbidden");
        }

        const project = await prismaClient.project.create({
            data: {
                name: parsedBody.data.name,
                script: parsedBody.data.script,
                userId: decoded.id,
            }
        });

        return res.json({ id: project.id });
    } catch (error) {
        console.error("Error creating project:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// PUT route to update a project
router.post("/update", async (req, res) => {
    const parsedBody = updatePojectSchema.safeParse(req.body);
    var token = req.headers.authorization;

    if (!parsedBody.success) {
        return res.status(400).send("Invalid input");
    }

    if (!token) {
        return res.status(401).send("Unauthorized");
    }


    // Remove the 'Bearer ' prefix from the token
    token = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded.id) {
            return res.status(403).send("Forbidden");
        }

        // Ensure the user is only updating their own project
        const existingProject = await prismaClient.project.findFirst({
            where: {
                id: parsedBody.data.id,
                userId: decoded.id,
            }
        });

        if (!existingProject) {
            return res.status(404).send("Project not found or you are not authorized to update this project");
        }

        const updatedProject = await prismaClient.project.update({
            where: {
                id: parsedBody.data.id
            },
            data: {
                name: parsedBody.data.name,
                script: parsedBody.data.script
            }
        });

        return res.json({ id: updatedProject.id });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).send("Internal Server Error");
    }
});

export const projectRouter = router;
