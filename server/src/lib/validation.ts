import { Request, Response } from "express";

// Function to validate parameters and create filters
export const validateAndCreateFilters = (
  req: Request,
  allowedParams: string[],
  requiredParams: string[] = []
) => {
  // check for unknown parameters
  const hasUnknownParams = Object.keys(req.query).some(
    (param) => !allowedParams.includes(param)
  );
  if (hasUnknownParams) {
    return { error: "Invalid parameters" };
  }

  // check for required parameters
  for (const requiredParam of requiredParams) {
    if (!req.query[requiredParam]) {
      return { error: `Missing required parameter: ${requiredParam}` };
    }
  }

  // create filters
  const filters: any = {};

  // validate and convert numeric parameters
  if (allowedParams.includes("min")) {
    if (req.query.min) {
      const minValue = Number(req.query.min);
      if (isNaN(minValue)) {
        return { error: "Min parameter must be a valid number" };
      }
      filters.min = minValue;
    }
  }

  if (allowedParams.includes("max")) {
    if (req.query.max) {
      const maxValue = Number(req.query.max);
      if (isNaN(maxValue)) {
        return { error: "Max parameter must be a valid number" };
      }
      filters.max = maxValue;
    }
  }

  if (allowedParams.includes("value")) {
    if (req.query.value) {
      const value = Number(req.query.value);
      if (isNaN(value)) {
        return { error: "Value parameter must be a valid number" };
      }
      filters.value = value;
    }
  }

  // validate state parameter for movement
  if (allowedParams.includes("state")) {
    if (req.query.state) {
      const validStates = ["start-moving", "stop-moving", "stationnary"];
      if (!validStates.includes(req.query.state as string)) {
        return {
          error: `Invalid state. Must be one of: ${validStates.join(", ")}`,
        };
      }
      filters.state = req.query.state as string;
    }
  }

  // validate and convert date parameters
  if (allowedParams.includes("start")) {
    if (req.query.start) {
      const startDate = new Date(req.query.start as string);
      if (isNaN(startDate.getTime())) {
        return { error: "Start date must be a valid date format" };
      }
      filters.start = req.query.start as string;
    }
  }

  if (allowedParams.includes("end")) {
    if (req.query.end) {
      const endDate = new Date(req.query.end as string);
      if (isNaN(endDate.getTime())) {
        return { error: "End date must be a valid date format" };
      }
      filters.end = req.query.end as string;
    }
  }

  // validate the filters coherence
  if (
    filters.min !== undefined &&
    filters.max !== undefined &&
    filters.min > filters.max
  ) {
    return { error: "Min value cannot be greater than max value" };
  }

  if (
    filters.start &&
    filters.end &&
    new Date(filters.start) > new Date(filters.end)
  ) {
    return { error: "Start date cannot be after end date" };
  }

  return { filters };
};
