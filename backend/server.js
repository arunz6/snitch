import app from "./src/app.js";
import config from "./src/config/config.js";
import connectDB from "./src/config/db.js";

connectDB();

app.listen(config.port, () => {
  console.log(`server is running at ${config.port} `);
});

//arun1234
//password
// class running 145 snitchL?/
///class 148 snitch running
//class 149 snitch running 48min
