import { Response } from "express";

export function missingFieldsResponse(
  missingFields: string[],
  res: Response,
  url: string
): void {
  res.redirect(url + "?error=Missing-fields-" + missingFields.join("_"));
}
