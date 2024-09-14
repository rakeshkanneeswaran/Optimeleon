import { it, describe, expect, vi } from 'vitest';
import app from '..';
import request from 'supertest';
import prismaClient from '../__mocks__/db';
import authMiddleware from '../libs/authMiddleware';

const mockToken = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmNmE0NjNiLTg5ZGEtNGViOS04NDkwLWFiMDZlYzNjZjQ1YyIsImlhdCI6MTcyNjMzMDk5MX0.7xDTfMdFky5zAQ9NnSr2mniQsAVrRNOHQJubRhUh3n8"

describe("Testing Projects routes ", () => {

    it("should return invalid inputes", async () => {
        const response = await request(app).post("/api/project").send({
            "name": "this is my name",

        }).set('Accept', 'application/json').set('Authorization', mockToken);
        expect(response.status).toBe(400)
        expect(response.body.message).toBe("Invalid input")

    })
    it("should return invalid inputes for headers", async () => {
        const response = await request(app).post("/api/project").send({
            "name": "this is my name",

        }).set('Accept', 'application/json')
        expect(response.status).toBe(401)
        expect(response.body.message).toBe("Unauthorized")


    })
})