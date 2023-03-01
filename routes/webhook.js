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
      'EEAAT2cYCAQboBAChZBPZByQ1Vm7sAzU4V55HkvClM7HGLRXfkvpFaBtN7bZCZACU9lxqOp2KrxdLrOoQiSWL7f3b8vJDvYhljFb72fyTenpeYNEP5JMg8TAGZAcQnhxGzQKsBZCdovlJgFWPBQZB89E9IefcrqmdapqZBajMHPu2uwySF3MZBwpWIm3ZAx7NZBWv999XEJ4ZB40PZBpAZDZD';
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
