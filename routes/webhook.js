import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(req.query.hub.challenge)
});

export default router;
