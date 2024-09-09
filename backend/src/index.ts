import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors());
const prisma = new PrismaClient();

app.post("/api/project" , async (req , res) => {
  console.log(req.body)
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


