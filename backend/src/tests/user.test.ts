import { it, describe, expect, vi } from 'vitest';
import app from '..';
import request from 'supertest';
import prismaClient from '../__mocks__/db';


describe("Testing app for user rotues", () => {

  prismaClient.user.findFirst.mockResolvedValue({
    id: "00acac65-c9ab-49aa-ab46-dc9ec2d05724",
    username: "testUser",
    password: "testPassword",
    name: "Test Name"
  })

  it("should return a valid JWT", async () => {
    const response = await request(app)
      .post("/api/user/signin")
      .send({
        username: "testUser",
        password: "testUser",
      })
      .set('Accept', 'application/json');
      console.log(response.body.token)
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
  it("integer should not be passes", async () => {
    const response = await request(app)
      .post("/api/user/signin")
      .send({
        username: 532345,
        password: 12345,

      })
      .set('Accept', 'application/json');

    expect(response.status).toBe(422);
    expect(response.body.message).toBe("improper inputs");

  });
}); 
