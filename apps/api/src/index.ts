import express from "express";
import authRouter from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from SprintFlow API");
});

app.use('/auth', authRouter);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});