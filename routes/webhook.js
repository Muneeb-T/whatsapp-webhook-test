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
        template: {
          language: {
            code: 'en_US',
          },
          components: [
            {
              type: 'body',
              parameters: [
                {
                  type: 'text',
                  text: message,
                },
              ],
            },
          ],
        },
      },
      {
        headers: {
          Authorization:
            'Bearer EAAT2cYCAQboBAHuJTRTHKicQGigLIZBBItbhwnKgKUKwNxSJYNT6P4rZCLQofuziuf1y7TfSNhwZCBQ7MvyFgVyxTvsBfrMAhFhqb2D5XAZCp0fZAkGfpChR75CcwYPVb9ik8p4GxkbvGMDEDmxi0LiyG2NTrRipezY5ZBh5ZCwiRPkZCHM7ZAZBC0VyM6nH3aBiEZCHD3XaCZCSTgZDZD',
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
  }
});

export default router;
