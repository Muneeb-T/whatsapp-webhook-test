import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send(
    req.query?.hub?.challenge ? req.query.hub.challenge : "Something went wrong"
  );
});

export default router;
