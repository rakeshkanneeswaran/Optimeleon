import { it, describe, expect } from 'vitest';
import app from '..';
import request from 'supertest';





describe("Testing app for signup", () => {
  it("should return a valid JWT", async () => {
      const response = await request(app)
          .post("/api/user/signin")
          .send({
            username: "testUser",
            password: "testUser",
          })
          .set('Accept', 'application/json');
       
      // Check that the token is a string and follows the typical JWT pattern
      expect(response.body.token).toMatch(/^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/);
  });
});
