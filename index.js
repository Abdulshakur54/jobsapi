// // index.js
// const express = require("express");

// const app = express();
// const PORT = 4000;

// app.listen(PORT, () => {
//   console.log(`API listening on PORT ${PORT} `);
// });

// app.get("/", (req, res) => {
//   res.send("Hey this is my API running 🥳");
// });

// app.get("/about", (req, res) => {
//   res.send("This is my about route..... ");
// });

// // Export the Express API
// module.exports = app;
require("express-async-errors");
const { getEnv } = require("./helpers");
const connectDB = require("./db/connect");
const express = require("express");
const app = express();
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");
const { validToken, attachUserId } = require("./middleware/authentication");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());
// extra packages

// routes
app.get("/", (req, res) => {
  res.send("jobs api");
});

app.use("/api/v1", authRouter);
app.use("/api/v1/jobs", [validToken, attachUserId], jobRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = getEnv("PORT") || 3000;

const start = async () => {
  try {
    await connectDB(getEnv("MONGO_URI"));
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
module.exports = app;
