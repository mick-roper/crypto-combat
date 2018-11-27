const express = require('express');

const app = express();

const service = require('./trainer-service');

const port = process.env.PORT || 3333;

app.use((err, _, res) => {
  console.error(err); // eslint-disable-line
  res.status(500).json({ message: err.message || 'an error occured' });
});

app.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'userId must be provided' });
    return;
  }

  const data = await service.getTrainerByUserId(userId);

  res.status(200)
    .json(data)
    .send();
});

app.post('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.status(400).send({ message: 'userId must be provided' });
    return;
  }

  const data = await service.createTrainerFor(userId);

  res.status(200)
    .json(data)
    .send();
});

app.listen(port, () => console.log(`server listening on port ${port}`)); // eslint-disable-line