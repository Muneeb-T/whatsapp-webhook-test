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
    const token = `Bearer EAAT2cYCAQboBAAiiOsLROYYT017AGK3L6vZCZADpNeOXd2eojV9lTX17DIA3SDIwIZABEdOCOV90yEQxwCias7b3y7j31E3ZC1ZCZA8LsYCrAADeZCtxgHM72FIgY2B0y2dTTrpg4r9uDoZAOeFM07HIaZA8FSkFpz63ZBtESOMG0KiWiI5Dcv5ZCBekz8LzHn26WrgIYZAlWICZCMAZDZD`;
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
