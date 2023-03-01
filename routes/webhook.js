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
    console.log({
      to,
      message, 
      version,
      phoneNumberId,
      message
    })
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
            'Bearer EAAT2cYCAQboBAMBCwW6W0REZBkmiuX2e50PlUCssxMyBebnB3UGYmCScxUwyn9VyU4UjjqzrnXVrsPC5BPFojzSV2qfq6fwMxZCDxKZC8n8boqG234UVXJKMYE9uR2GvMZAoNC6Au79DbZBAsuoelNlg3NA3nrN2reZCWmhbZBfV61uJk1jjVO7jkhm94VDRbs8G4N2QnRvkgZDZD',
        },
      },
    );
    return data;
  } catch (err) {
    return err
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
