import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', (req, res) => {
  const response = req.query['hub.challenge'] || 'Invalid challenge value';
  res.send(response);
});

router.post('/', (req, res) => {
  const { from, text } = req.body?.entry[0]?.changes[0]?.value?.messages[0];
  const { body } = text;
  axios
    .post('https://tan-powerful-hummingbird.cyclic.app/dialogflow', {
      languageCode: 'en',
      queryText: body,
      sessionId: from,
    })
    .then((data) => {
      console.log(data);
    });
});

export default router;
