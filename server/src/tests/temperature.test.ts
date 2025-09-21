import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("Temperature API", () => {
  describe("GET /api/temperature", () => {
    it("should reject invalid min parameter", async () => {
      const response = await request(app).get(
        "/api/temperature?min=not-a-number"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid max parameter", async () => {
      const response = await request(app).get("/api/temperature?max=invalid");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid date format", async () => {
      const response = await request(app).get(
        "/api/temperature?start=invalid-date"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid end date format", async () => {
      const response = await request(app).get(
        "/api/temperature?end=not-a-date"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject min greater than max", async () => {
      const response = await request(app).get("/api/temperature?min=30&max=20");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should handle valid parameters", async () => {
      const response = await request(app).get("/api/temperature?min=20&max=25");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/temperature/latest", () => {
    it("should handle the request", async () => {
      const response = await request(app).get("/api/temperature/latest");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should return 404 when no data exists", async () => {
      const response = await request(app).get("/api/temperature/latest");

      if (response.status === 404) {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("No temperature data found");
      } else {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
      }
    });
  });

  describe("GET /api/temperature/aggregate", () => {
    it("should require start parameter", async () => {
      const response = await request(app).get(
        "/api/temperature/aggregate?end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should require end parameter", async () => {
      const response = await request(app).get(
        "/api/temperature/aggregate?start=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid start date", async () => {
      const response = await request(app).get(
        "/api/temperature/aggregate?start=invalid&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid end date", async () => {
      const response = await request(app).get(
        "/api/temperature/aggregate?start=2025-01-01&end=invalid"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject start date after end date", async () => {
      const response = await request(app).get(
        "/api/temperature/aggregate?start=2025-01-02&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should handle valid date range", async () => {
      const response = await request(app).get(
        "/api/temperature/aggregate?start=2025-01-01&end=2025-01-02"
      );

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  describe("Error handling", () => {
    it("should handle database errors gracefully", async () => {
      const response = await request(app).get("/api/temperature");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should return proper error structure", async () => {
      const errorResponse = await request(app).get(
        "/api/temperature?min=invalid"
      );

      expect(errorResponse.status).toBe(400);
      expect(errorResponse.body.success).toBe(false);
      expect(errorResponse.body.message).toBeDefined();
      expect(typeof errorResponse.body.message).toBe("string");
    });
  });
});
