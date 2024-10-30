import { cleanEnv, str, port } from "envalid";

const env = cleanEnv(process.env, {
  PORT: port({ default: 3001 }),
  MONGO_URI: str(),
  JWT_SECRET: str(),
});

export default env;
