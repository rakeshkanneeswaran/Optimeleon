import express from 'express';
import cors from "cors"
import { createTopicIfNotExists } from './kafka/kafka';
import { projectRouter } from './router/project';
import { userRotuer } from './router/authentication';

const app = express();
createTopicIfNotExists()
app.use(express.json())
app.use(cors());


app.use("/api/project",projectRouter)
app.use("/api/user",userRotuer)


export default app;


