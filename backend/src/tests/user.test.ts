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
       

      expect(response.body.token).toMatch(/^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/);
  });

  it("should return a improper inputs ", async () => {
    const response = await request(app)
        .post("/api/user/signin")
        .send({
          username: "testUser",
        })
        .set('Accept', 'application/json');
     
    expect(response.status).toBe(422);
    expect(response.body.message).toBe("improper inputs");
    
  });
}); 
