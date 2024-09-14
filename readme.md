Here's the updated documentation with the added steps for running tests:

---

# Full Stack Application

This repository contains the full-stack application with a backend service, a frontend service, and a database processor microservice. 

## Backend Service

### Solution Description:
Built with Node.js, Prisma, PostgreSQL, and Kafka for asynchronous messaging. Provides APIs for project management authenticated via JWT tokens. Kafka ensures reliable script update processing.

### Justification of Decisions:
- **Technology Stack**: Chosen for scalability (Node.js), robust data handling (Prisma, PostgreSQL), and reliable messaging (Kafka).
- **JWT Authentication**: Secure for API authentication.
- **Kafka Integration**: Ensures scalable and fault-tolerant script updates decoupled from immediate database operations.

### Main Challenges:
- Asynchronous Processing
- Integration Complexity
- Security and Scalability

## Frontend Service

### Solution Description:
Built using Next.js and dynamic routing. Interacts with backend APIs for seamless project management.

### Justification of Decisions:
- **Next.js Framework**: For SEO Optimization, Dynamic Routing, and Enforcing Standard Project Structure.
- **API Interaction**: Separates frontend and backend concerns for scalability and maintainability.

### Main Challenges:
- Dynamic UI Updates
- SEO Optimization
- Responsive Design and Cross-Browser Compatibility

## Database Processor Microservice

### Solution Description:
Consumes Kafka messages to update a PostgreSQL database based on backend-triggered script events. This enables distributing work across multiple consumer groups for scalability.

### Justification of Decisions:
- **Microservice Architecture**: Scalable and fault-isolated for handling database updates asynchronously.
- **Kafka Consumer**: Reliable message delivery under high load, reduces latency between backend triggers and database updates.

### Main Challenges:
- Message Ordering and Processing
- Error Handling and Message Delivery Guarantees
- Performance Optimization

## System Design

![System Design](https://github.com/user-attachments/assets/bfeb85e6-8a82-427a-adbb-2bdae7855ec1)

## Setup Instructions

### Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up PostgreSQL:
   ```bash
   docker run --name postgres-db -e POSTGRES_PASSWORD=yourpassword -d -p 5432:5432 postgres
   ```

4. Set up Kafka:
   ```bash
   docker run --name kafka-container -d -p 9092:9092 apache/kafka:3.7.1
   ```

5. Configure environment (`.env` file in backend folder):
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   KAFKA_BROKER="localhost:9092"
   KAFKA_TOPIC="optimelon-update"
   ```

6. Apply migrations and generate Prisma client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

7. Start the backend server:
   ```bash
   npm run start
   ```

### Database Processor Microservice

1. Navigate to the `dbprocess` folder:
   ```bash
   cd dbprocess
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the database processor microservice:
   ```bash
   npm run start
   ```

### Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```

4. Alternatively, start with port **3001**:
   ```bash
   npm run start
   ```

### Running Tests

1. Before running tests, update the Prisma client import for mocking:
   - Navigate to `backend/src/libs/prismaClient.ts`.
   - Replace the import statement and the Prisma client initialization as follows:

     ```typescript
     import prismaClientMocked from '../__mocks__/db';
     import { PrismaClient } from '@prisma/client';

     // const prismaClient = prismaClientMocked
     const prismaClient = new PrismaClient();
     // const prismaClient = new PrismaClient();
     export default prismaClient;
     ```

     Change to:

     ```typescript
     import prismaClientMocked from '../__mocks__/db';
     import { PrismaClient } from '@prisma/client';

     const prismaClient = prismaClientMocked;
     // const prismaClient = new PrismaClient();
     export default prismaClient;
     ```

2. Run the tests:
   ```bash
   npm run test
   ```

   This will execute the test files located in the `src/test` folder.

### Additional Information

Ensure PostgreSQL, Kafka, and the `dbprocess` microservice are running for full application functionality.

---

Feel free to adjust any details as needed!