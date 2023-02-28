import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    req.query?.challenge ? req.query.challenge : "Something went wrong"
  );
});

export default router;
