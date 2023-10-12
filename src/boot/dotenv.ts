import iEnv from "@interfaces/iEnv";
import dotenv from "dotenv";

export default function () {
  try {
    dotenv.config();
    (global as any).env = {
      express: {
        port: Number(process.env.EXPRESS_PORT),
      },
      mongoose: {
        uri: String(process.env.MONGODB_URI),
      },
    } as iEnv;
    console.log("Loaded environment variables");
  } catch (error) {
    throw new Error(`${error}`);
  }
}
