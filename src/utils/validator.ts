import { Response } from "express";

export function validateRequestBody(
  body: { [key: string]: any },
  requiredFields: string[],
  res: Response,
  url: string,
  missingCallback: (missingFields: string[], res: Response, url: string) => void
) {
  const missingFields: string[] = [];

  requiredFields.forEach((field) => {
    try {
      if (
        !Object.prototype.hasOwnProperty.call(body, field) ||
        body[field] === undefined ||
        body[field] === null ||
        body[field] === ""
      ) {
        missingFields.push(field);
      }
    } catch (error) {
      throw error;
    }
  });

  if (missingFields.length > 0) {
    missingCallback(missingFields, res, url);
    return false; // Indicates that validation failed
  }

  return true; // Indicates that validation passed
}
