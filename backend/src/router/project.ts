import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createPojectSchema, updatePojectSchema } from "../types";
import { processDataUpdate } from "../kafka/kafka"; // Adjust path as needed

const prismaClient = new PrismaClient();
const JWT_SECRET = "your_secret_key";

const router = Router();

// POST route to create a project
router.post("/", async (req, res) => {
    console.log("something hit the server");
    console.log(req.body);
    console.log(req.cookies);

    const parsedBody = createPojectSchema.safeParse(req.body);
    const token = req.headers.authorization;

    if (!parsedBody.success) {
        return res.status(400).send("Invalid input");
    }

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    const cleanToken = token.replace("Bearer ", "");
    try {
        const decoded = jwt.verify(cleanToken, JWT_SECRET) as JwtPayload;
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

// DELETE route to delete a project
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
        if (!decoded.id) {
            return res.status(403).send("Forbidden");
        }

        await prismaClient.project.delete({
            where: {
                id: id,
                userId: decoded.id,
            }
        });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Failed to delete project' });
    }
});

// GET route to fetch projects
router.get("/", async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    const cleanToken = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(cleanToken, JWT_SECRET) as JwtPayload;
        if (!decoded.id) {
            return res.status(403).send("Forbidden");
        }

        const projects = await prismaClient.project.findMany({
            where: {
                userId: decoded.id
            }
        });

        return res.json({ projects });
    } catch (error) {
        console.error("Error fetching projects:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// PUT route to update a project
router.post("/update", async (req, res) => {
    const parsedBody = updatePojectSchema.safeParse(req.body);
    const token = req.headers.authorization;

    if (!parsedBody.success) {
        return res.status(400).send("Invalid input");
    }

    if (!token) {
        return res.status(401).send("Unauthorized");
    }

    const cleanToken = token.replace("Bearer ", "");

    try {
        const decoded = jwt.verify(cleanToken, JWT_SECRET) as JwtPayload;
        if (!decoded.id) {
            return res.status(403).send("Forbidden");
        }

        // Push data to Kafka
        await processDataUpdate({
            id: parsedBody.data.id,
            userId: decoded.id,
            name: parsedBody.data.name,
            script: parsedBody.data.script
        });

        return res.status(202).json({
            "message": 'Update request received and is being processed.'
        });
    } catch (error) {
        console.error("Error updating project:", error);
        return res.status(500).send("Internal Server Error");
    }
});

export const projectRouter = router;
