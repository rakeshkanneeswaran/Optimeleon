import express from 'express';
import cors from "cors"
import { projectRouter } from './router/project';
import { userRotuer } from './router/authentication';

const app = express();
app.use(express.json())
app.use(cors());


app.use("/api/project",projectRouter)
app.use("/api/user",userRotuer)



app.listen(3001, () => {
  console.log('Server is running on port 3001');
});


