Here's the updated `README.md` with the instruction to start the backend first and then the frontend:

```markdown
# Full Stack Application

This repository contains both the frontend and backend of the application.

## Backend

The backend is built using **Node.js**, **Prisma**, and **PostgreSQL**.

### Steps to Set Up Backend

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Set up a **PostgreSQL** database using Docker or any other preferred service. 
   - If using Docker, run the following command:
     ```bash
     docker run --name postgres-db -e POSTGRES_PASSWORD=yourpassword -d -p 5432:5432 postgres
     ```

4. Create a `.env` file in the `database` folder (inside the backend directory) and set the `DATABASE_URL` environment variable. Here's an example of the `.env` file:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
   ```

5. Apply the Prisma migrations and generate the Prisma client:
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. Start the backend server:
   ```bash
   npm run start
   ```

### Additional Information

- The backend uses **Zod** for request/input validation.
- It uses **JWT** for authentication.

## Frontend

The frontend is built using **React**.

### Steps to Set Up Frontend

1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```

3. Once the backend is up and running, you can start the development server:
   ```bash
   npm run dev
   ```

4. Alternatively, start the server with port **3001** (since port 3000 is used by the backend):
   ```bash
   npm run start
   ```

### Additional Information

- The frontend uses dynamic routing to generate new projects.

## Final Notes

After completing these steps, both the backend and frontend should be running, and the application will be ready for use.
```

Now, this version ensures that the backend is started first, followed by the frontend.