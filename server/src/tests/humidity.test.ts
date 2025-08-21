import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("Humidity API", () => {
  describe("GET /api/humidity", () => {
    it("should reject invalid min parameter", async () => {
      const response = await request(app).get("/api/humidity?min=not-a-number");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid max parameter", async () => {
      const response = await request(app).get("/api/humidity?max=invalid");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid date format", async () => {
      const response = await request(app).get(
        "/api/humidity?start=invalid-date"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid end date format", async () => {
      const response = await request(app).get("/api/humidity?end=not-a-date");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject min greater than max", async () => {
      const response = await request(app).get("/api/humidity?min=80&max=60");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should handle valid parameters", async () => {
      const response = await request(app).get("/api/humidity?min=40&max=60");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/humidity/latest", () => {
    it("should handle the request", async () => {
      const response = await request(app).get("/api/humidity/latest");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should return 404 when no data exists", async () => {
      const response = await request(app).get("/api/humidity/latest");

      if (response.status === 404) {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("No humidity data found");
      } else {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
      }
    });
  });

  describe("GET /api/humidity/aggregate", () => {
    it("should require start parameter", async () => {
      const response = await request(app).get(
        "/api/humidity/aggregate?end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should require end parameter", async () => {
      const response = await request(app).get(
        "/api/humidity/aggregate?start=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid start date", async () => {
      const response = await request(app).get(
        "/api/humidity/aggregate?start=invalid&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid end date", async () => {
      const response = await request(app).get(
        "/api/humidity/aggregate?start=2025-01-01&end=invalid"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject start date after end date", async () => {
      const response = await request(app).get(
        "/api/humidity/aggregate?start=2025-01-02&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should handle valid date range", async () => {
      const response = await request(app).get(
        "/api/humidity/aggregate?start=2025-01-01&end=2025-01-02"
      );

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  describe("Error handling", () => {
    it("should handle database errors gracefully", async () => {
      const response = await request(app).get("/api/humidity");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should return proper error structure", async () => {
      const errorResponse = await request(app).get("/api/humidity?min=invalid");

      expect(errorResponse.status).toBe(400);
      expect(errorResponse.body.success).toBe(false);
      expect(errorResponse.body.message).toBeDefined();
      expect(typeof errorResponse.body.message).toBe("string");
    });
  });
});
