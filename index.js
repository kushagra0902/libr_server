import dotenv from "dotenv";
import { connect_db } from "./src/db/db.js";
import { app } from "./src/app.js";
import https from "https";
dotenv.config();

const db_name = "Addrs"; //change
const db_uri = process.env.MONGO_URI;

await connect_db(db_uri, db_name);

async function pinger() {
  console.log("Pinging Relay");
  setInterval(() => {
    https.get("https://libr-relay-y7ib.onrender.com", (res) => {
      console.log(`Response Status: ${res.statusCode}`);
    });
  }, 10 * 60 * 1000);
  console.log("Pinged successfully");
}

pinger();
app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port:`, process.env.PORT || 8080);
});
