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
  }
};

const sendMessage = async (to, message) => {
  try {
    const phoneNumberId = '117158507969853';
    const version = 'v15.0';
    const token =
      'EAAT2cYCAQboBAJTmQiycFgLDHGAoZAK32ZCjlKFHjwl7fNNHPp4uF2V9JDuFHU6YH4qx2gHEn2il0GUFCIMuJGFdeWD1KEm0HnGcNhWBDBfYB461jYHesiQP5ITPbsEaDWjYRZC7JOZCwomltmZBYP3wRG5PIhXHZA4eUWMbFTY2rOXSqfaHSaW4xOptbkro3LGy5Y4QNd7gZDZD';
    const { data } = await axios.post(
      `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
      {
        messaging_product: 'whatsapp',
        to: '919747497621',
        type: 'text',
        text: {
          body: 'Hope you are doing well',
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          state: `$2a$12$Yo.1DoRQvf3S6sn2WLFGMetXfV2K2Dk0Hvf7ejqWnICTbXVLM7fxu`,
        },
      },
    );
    return data;
  } catch (err) {
    return err;
  }
};

router.post('/', async (req, res) => {
  try {
    const { from, text } = req.body?.entry[0]?.changes[0]?.value?.messages[0];
    const { body } = text;
    const responseMessage = await callDialogFlow(body, from);
    console.log(responseMessage, 'rrrrrr');
    const send = await sendMessage(from, responseMessage);
    res.send(send);
  } catch (err) {
    console.log('Second error');
    console.log(err, 'ssss');
    res.send(err);
  }
});

export default router;
