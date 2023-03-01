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
    const token = `Bearer EAAT2cYCAQboBANxqbgQZBm0uqEafEkwvPO69x98H5NX7j5GplevxYwsCpd1KMwnMkkz1PaA8lZCn6Eyapv1NTgeo1RA3cWo0nqJG2hkOgujAt7zkj64VAg4t6ahRFylpO9fVBZCa6fWmkh6oClvT1jHnHqzEfP7ZALE8tC3uZBGLZCWZBNRK3hUQZCHoygZCmJfYo20tk8w6MJgZDZD`;
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
          Authorization: token,
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
