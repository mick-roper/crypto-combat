const express = require('express');

const app = express();

const service = require('./trainer-service');

const port = process.env.PORT || 3333;

app.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'userId must be provided' });
    return;
  }

  try {
    const data = await service.getTrainerByUserId(userId);

    if (!data) {
      res.status(404).send();
      return;
    }

    res.status(200)
      .json(data)
      .send();
  } catch (err) {
    console.error(err);

    let { message } = err;

    message = message || 'an error occured';

    res.status(500)
      .json({ message })
      .send();
  }
});

app.post('/', async (req, res) => {
  const { body } = req;

  if (!body) {
    res.status(400).send({ message: 'userId must be provided' });
    return;
  }

  try {
    const data = await service.createTrainerFor(body);

    if (!data) {
      res.status(404).send();
      return;
    }

    res.status(200)
      .json(data)
      .send();
  } catch (err) {
    console.error(err);

    switch (typeof (err)) {
      case 'ValidationError': {
        const { validationErrors } = err;
        res.status(400)
          .json({ message: 'invalid data', validationErrors })
          .send();
      }
        break;
      case 'NotImplementedError':
        res.status(501).send();
        break;
      default: {
        let { message } = err;

        message = message || 'an error occured';

        res.status(500)
          .json({ message })
          .send();
      }
    }
  }
});

app.listen(port, () => console.log(`server listening on port ${port}`)); // eslint-disable-line