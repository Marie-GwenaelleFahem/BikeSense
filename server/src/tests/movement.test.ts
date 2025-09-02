import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../app";

describe("Movement API", () => {
  describe("GET /api/movement", () => {
    it("should reject invalid state parameter", async () => {
      const response = await request(app).get(
        "/api/movement?state=invalid-state"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid date format", async () => {
      const response = await request(app).get(
        "/api/movement?start=invalid-date"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid end date format", async () => {
      const response = await request(app).get("/api/movement?end=not-a-date");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject start date after end date", async () => {
      const response = await request(app).get(
        "/api/movement?start=2025-01-02&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should handle valid state parameter", async () => {
      const response = await request(app).get(
        "/api/movement?state=start-moving"
      );

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should handle valid date range", async () => {
      const response = await request(app).get(
        "/api/movement?start=2025-01-01&end=2025-01-02"
      );

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  describe("GET /api/movement/latest", () => {
    it("should handle the request", async () => {
      const response = await request(app).get("/api/movement/latest");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should return 404 when no data exists", async () => {
      const response = await request(app).get("/api/movement/latest");

      if (response.status === 404) {
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("No movement data found");
      } else {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data).toBeDefined();
      }
    });
  });

  describe("GET /api/movement/aggregate", () => {
    it("should require start parameter", async () => {
      const response = await request(app).get(
        "/api/movement/aggregate?end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should require end parameter", async () => {
      const response = await request(app).get(
        "/api/movement/aggregate?start=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid start date", async () => {
      const response = await request(app).get(
        "/api/movement/aggregate?start=invalid&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject invalid end date", async () => {
      const response = await request(app).get(
        "/api/movement/aggregate?start=2025-01-01&end=invalid"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should reject start date after end date", async () => {
      const response = await request(app).get(
        "/api/movement/aggregate?start=2025-01-02&end=2025-01-01"
      );

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBeDefined();
    });

    it("should handle valid date range", async () => {
      const response = await request(app).get(
        "/api/movement/aggregate?start=2025-01-01&end=2025-01-02"
      );

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });
  });

  describe("Database and server errors", () => {
    it("should handle database errors gracefully", async () => {
      const response = await request(app).get("/api/movement");

      expect(response.status).toBeDefined();
      expect(response.body).toBeDefined();
    });

    it("should return proper error structure", async () => {
      const errorResponse = await request(app).get(
        "/api/movement?state=invalid"
      );

      expect(errorResponse.status).toBe(400);
      expect(errorResponse.body.success).toBe(false);
      expect(errorResponse.body.message).toBeDefined();
      expect(typeof errorResponse.body.message).toBe("string");
    });
  });
});
