const express = require('express');

const app = express();

const port = process.env.PORT || 3333;

app.get('/:userId', (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res
      .status(400)
      .send({
        message: 'userId must be provided',
      });
  }
});

app.listen(port, () => console.log(`server listening on port ${port}`)); // eslint-disable-line
