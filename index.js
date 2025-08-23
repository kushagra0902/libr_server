import dotenv from "dotenv";
import { connect_db } from "./src/db/db.js";
import { app } from "./src/app.js";
import https from "https"
dotenv.config();

const db_name = "Test";  //change
const db_uri = process.env.MONGO_URI;

await connect_db(db_uri, db_name);


function startPinger() {
  setInterval(() => {
    const req = https.request('https://libr-relay-y7ib.onrender.com', { method: 'GET' }, (res) => {
      console.log(`Status Code: ${res.statusCode}`);
      
    });

    req.on('error', (err) => {
      console.error('Ping failed:', err.message);
    });

    req.end();
  }, 10 * 60 * 1000); // every 10 minutes
}

startPinger();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server started on port:`, process.env.PORT || 8080);
});