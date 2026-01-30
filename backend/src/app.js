const cors = require('cors');
const express = require("express");
const cookieParser=require("cookie-parser");
const errorHandler=require("./middleware/error.middleware");

const authRoutes=require("./routes/auth.routes");
const jobRoutes=require("./routes/job.routes");

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true
  })
);


app.use(express.json()); //parses json body
app.use(cookieParser()); //for refresh tokens


app.use("/api/auth",authRoutes);
app.use("/api/jobs",jobRoutes);

app.use(errorHandler);


module.exports=app
