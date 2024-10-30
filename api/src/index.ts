import "dotenv/config";
import app from "./app.js";
import env from "./utils/validate.env.js";
import connectDB from "./config/connectDB.js";

const port = env.PORT;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
