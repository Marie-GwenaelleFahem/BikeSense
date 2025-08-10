import { Request, Response } from "express";

// Function to validate parameters and create filters
export const validateAndCreateFilters = (
  req: Request,
  allowedParams: string[]
) => {
  // validate parameters
  const hasUnknownParams = Object.keys(req.query).some(
    (param) => !allowedParams.includes(param)
  );
  if (hasUnknownParams) {
    return { error: "Invalid parameters" };
  }

  // create filters
  const filters: any = {};
  if (allowedParams.includes("min"))
    filters.min = req.query.min ? Number(req.query.min) : undefined;
  if (allowedParams.includes("max"))
    filters.max = req.query.max ? Number(req.query.max) : undefined;
  if (allowedParams.includes("value"))
    filters.value = req.query.value ? Number(req.query.value) : undefined;
  if (allowedParams.includes("state"))
    filters.state = req.query.state as string;
  if (allowedParams.includes("start"))
    filters.start = req.query.start as string;
  if (allowedParams.includes("end")) filters.end = req.query.end as string;

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
