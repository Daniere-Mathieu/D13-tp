import dotenv from "./dotenv";
import express from "./express";
import mongoose from "./mongoose";

export default async function () {
  dotenv();
  await mongoose();
  await express();
}
