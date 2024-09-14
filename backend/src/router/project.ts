import { Router } from "express";
import prismaClient from "../libs/prismaClient.ts.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import { createPojectSchema, updatePojectSchema } from "../types";
import { processDataUpdate } from "../kafka/kafka"; // Adjust path as needed
import authMiddleware from "../libs/authMiddleware.js";
const JWT_SECRET = "your_secret_key";
const router = Router();




// POST route to create a project
router.post("/", authMiddleware, async (req, res) => {

    const parsedBody = createPojectSchema.safeParse(req.body);
    console.log(req.userId)
    if (!parsedBody.success) {
        return res.status(400).json({
            "message": "Invalid input"
        })
    }
    try {
        if (!req.userId) {
            return res.status(400).json({
                "message": "Invalid input"
            })
        }
        const project = await prismaClient.project.create({
            data: {
                name: parsedBody.data.name,
                script: parsedBody.data.script,
                userId: req.userId
            }
        });
        return res.json({ id: project.id });
    } catch (error) {
        // console.error("Error creating project:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// DELETE route to delete a project
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;

    try {

        await prismaClient.project.delete({
            where: {
                id: id,
                userId: req.userId,
            }
        });

        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        // console.error('Error deleting project:', error);
        res.status(500).json({ message: 'Failed to delete project' });
    }
});

// GET route to fetch projects
router.get("/", authMiddleware, async (req, res) => {

    try {

        const projects = await prismaClient.project.findMany({
            where: {
                userId: req.userId
            }
        });

        return res.json({ projects });
    } catch (error) {
        // console.error("Error fetching projects:", error);
        return res.status(500).send("Internal Server Error");
    }
});

// PUT route to update a project
router.post("/update", authMiddleware, async (req, res) => {

    try {
        const parsedBody = updatePojectSchema.safeParse(req.body);
        if (!req.userId) {
            return res.status(400).json({
                "message": "Invalid input"
            })
        }
        if (!parsedBody.success) {
            return res.status(400).send("Invalid input");
        }
        await processDataUpdate({
            id: parsedBody.data.id,
            userId: req.userId,
            name: parsedBody.data.name,
            script: parsedBody.data.script
        });

        return res.status(202).json({
            "message": 'Update request received and is being processed.'
        });
    } catch (error) {
        return res.status(500).send("Internal Server Error");
    }
});

export const projectRouter = router;
