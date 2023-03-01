import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', (req, res) => {
  const response = req.query['hub.challenge'] || 'Invalid challenge value';
  res.send(response);
});

const callDialogFlow = async (queryText, sessionId) => {
  try {
    const { data } = await axios.post(
      'https://tan-powerful-hummingbird.cyclic.app/dialogflow',
      {
        languageCode: 'en',
        queryText,
        sessionId,
      },
    );
    return data;
  } catch (err) {
    console.log('Third error');
    console.log(err);
    res.send(err);
  }
};

const sendMessage = async (to, message) => {
  try {
    const phoneNumberId = '117158507969853';
    const version = 'v15.0';
    const { data } = await axios.post(
      `https://graph.facebook.com/v15.0/117158507969853/messages`,
      {
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: {
          body: message,
        },
      },
      {
        headers: {
          Authorization:
            'Bearer EAAT2cYCAQboBAHZBghKu7aqAhAXsFi5YYsXs2MpCy2gAvHdZCQlTrakDnyTZCQSfDE3QFnApm4H6itHGjyaPGZAAdUkzs2RgAbCSLp85OjZBZAOwGSPMUieV1nPfKe58jjphT2q5MwPsdFsijQoSITGpabu6thxdp0v2XBvi5fYbvjc9W2I4XwFHQr8LtN9QqY92TeihEotgZDZD',
        },
      },
    );
    return data;
  } catch (err) {
    console.log('first error');
    console.log(err, 'ffff');
    res.send(err);
  }
};

router.post('/', async (req, res) => {
  try {
    const { from, text } = req.body?.entry[0]?.changes[0]?.value?.messages[0];
    const { body } = text;
    const responseMessage = await callDialogFlow(body, from);
    console.log(responseMessage, 'rrrrrr');
    const send = await sendMessage(from, responseMessage);
    console.log(send, 'jgvhg');
    res.send(send);
  } catch (err) {
    console.log('Second error');
    console.log(err, 'ssss');
    res.send(err);
  }
});

export default router;
