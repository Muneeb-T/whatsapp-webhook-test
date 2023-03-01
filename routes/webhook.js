import express from 'express';
import axios from 'axios';
const router = express.Router();

router.get('/', (req, res) => {
  const response = req.query['hub.challenge'] || 'Invalid challenge value';
  res.send(response);
});

const callDialogFlow = async (queryText, sessionId) => {
  const { data } = await axios.post(
    'https://tan-powerful-hummingbird.cyclic.app/dialogflow',
    {
      languageCode: 'en',
      queryText,
      sessionId,
    },
  );
  return data;
};

const sendMessage = async (to, message) => {
  try {
    const phoneNumberId = '117158507969853';
    const version = 'v16.0';
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
    );
    return data;
  } catch (err) {
    console.log(err);
  }
};

router.post('/', async (req, res) => {
  try {
    const { from, text } = req.body?.entry[0]?.changes[0]?.value?.messages[0];
    const { body } = text;
    const responseMessage = await callDialogFlow(body, from);
    console.log(responseMessage);
    const send = await sendMessage(from, responseMessage);
    console.log(send);
    res.send(send);
  } catch (err) {
    console.log(err);
  }
});

export default router;
