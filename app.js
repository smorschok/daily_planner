const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const http = require("http").createServer(app);
const port = process.env.PORT || 8080;

app.use(express.json({ extended: true }));

app.use("/api/date", require("./routes/calendar.routes"));
app.use("/api/user", require("./routes/user.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/admin", require("./routes/admin.routes"));
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
http.listen(port, () => {
  console.log(`App started on port ${port} ...`);
});
