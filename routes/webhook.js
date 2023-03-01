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
    const { data } = await axios.post(
      `https://graph.facebook.com/${version}/${phoneNumberId}/messages`,
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
            'Bearer EAAT2cYCAQboBAHGzhWPu0ZAaC9szUV06APAEJGgydq004QPK4YfIJ3adGNA1lZARselfqi7iWxBZBv0gOlOZBn48chGx2uQlkNglhVhPZAZBUKXl8MBG4PpxI4f65kslwZAsQ2P78nMbV8OFHlp4ouIDnDHDtRl3HdwUSI6Tu0rVR4UdcHXBZAreniG4QUPw1vtDQqVDcQZB3RAZDZD',
        },
      },
    );
    return data;
  } catch (err) {
    console.log('first error');
    console.log(err, 'ffff');
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
