import request from "supertest";
import { app } from "@/app";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Create Check-in (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a check-in", async () => {
    const { token } = await createAndAuthenticateUser(app);

    const gym = await prisma.gym.create({
      data: {
        title: "Javascript Gym",
        latitude: -22.0165786,
        longitude: -47.9038534,
      },
    });

    const response = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins  `)
      .set("Authorization", `Bearer ${token}`)
      .send({
        latitude: -22.0165786,
        longitude: -47.9038534,
      });

    expect(response.statusCode).toEqual(201);
  });
});
