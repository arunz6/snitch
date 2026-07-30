import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(config.port, () => {
  console.log(`server is running at ${config.port} `);
});



 //class 153 55 min done 
 