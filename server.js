const express = require("express");
const dbConnect = require("./config/db/dbConnect");
const cors = require("cors");
const dotenv = require("dotenv");
const footerRoute = require("./routes/footer");
const priceRoute = require("./routes/price");
const userRoutes = require("./routes/user")
const bodyParser = require("body-parser");
 
dotenv.config();
const app = express();

dbConnect();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json({ limit: "1000000mb" })); 
// Global error handling middleware

app.use(express.json());

const corsOptions = {
  origin: "*", // Allow any origin
  credentials: true, // Allow cookies
  allowedHeaders: ["Authorization", "Content-Type", "Accept"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable CORS for all resources

app.use("/api/footers", footerRoute);
app.use("/api/price", priceRoute);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server is running ${PORT}`));
