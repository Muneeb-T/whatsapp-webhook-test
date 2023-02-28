import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  const response = req.query["hub.challenge"] || "Invalid challenge value";
  res.send(response);
});

router.post('/', (req,res)=>{
  console.log(req.body)
  res.send(req.body)
})

export default router;
