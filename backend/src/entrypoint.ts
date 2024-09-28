import app from ".";
import process from "node:process";
import { availableParallelism } from "node:os"
import cluster from "node:cluster"

const numOfCpus = availableParallelism();

if (cluster.isPrimary) {

    console.log(`Master ${process.pid} is running`);
    for (let i = 0; i < numOfCpus; i++) {
        cluster.fork();
    }
    cluster.on('exit', () => {
        console.log(`Worker ${process.pid} died`);
        cluster.fork();
    })
}
else {
    app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
}


