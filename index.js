import express from "express";
import webhookRouter from "./routes/webhook.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", webhookRouter);
app.listen(3000, () => {
  console.log("Server started successfully at Port 3000");
});
