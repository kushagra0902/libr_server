import dotenv from "dotenv";
import { connect_db } from "./src/db/db.js";
import { app } from "./src/app.js";

dotenv.config();

const db_name = "Test";  //change
const db_uri = process.env.MONGO_URI;

await connect_db(db_uri, db_name);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port:`, process.env.PORT || 8080);
});