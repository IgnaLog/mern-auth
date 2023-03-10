import express from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
import cors from "cors";
import logger from "./middlewares/logEvents.js";
import errorHandle from "./middlewares/errorHandle.js";
import credentials from "./middlewares/credentials.js";
import corsOptionsDelegate from "./config/corsOptions.js";
import { PORT } from "./config/dotenv.js";
import verifyJWT from "./middlewares/verifyJWT.js";
import cookieParser from "cookie-parser";
import employeesRoutes from "./routes/employees.routes.js";
import usersRoutes from "./routes/users.routes.js";
import registerRoutes from "./routes/register.routes.js";
import authRoutes from "./routes/auth.routes.js";
import refreshRoutes from "./routes/refresh.routes.js";
import logoutRoutes from "./routes/logout.routes.js";
import connectDB from "./config/dbConn.js";

// const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();

/* Connection to MongoDB */
connectDB();

/* Middlewares */
// Custom middleware logger
app.use(logger);
// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resources Sharing
app.use(cors(corsOptionsDelegate));
// Built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// Built-in middleware for json
app.use(express.json());
// Middleware for cookie
app.use(cookieParser());
// Serve static files
// app.use("/", express.static(path.join(__dirname, "/public")));

/* Routes */
app.use("/register", registerRoutes);
app.use("/auth", authRoutes);
app.use("/refresh", refreshRoutes);
app.use("/logout", logoutRoutes);
app.use(verifyJWT);
app.use("/employees", employeesRoutes);
app.use("/users", usersRoutes);

/* Middlewares */
// Middleware to handle errors
app.use(errorHandle);

/* Open the server */
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
