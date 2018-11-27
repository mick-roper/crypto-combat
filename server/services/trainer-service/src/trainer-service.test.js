const service = require('./trainer-service');

describe('getTrainerByUserId', () => {
  test('throws if no userId', async () => {
    try {
      await service.getTrainerByUserId();
    } catch (e) {
      const { message } = e;
      expect(message).toMatch('userId is not defined');
    }

    expect.assertions(1);
  });
});

describe('createTrainerFor', () => {
  test('throws if no userId', async () => {
    try {
      await service.createTrainerFor();
    } catch (e) {
      const { message } = e;
      expect(message).toMatch('data is not defined');
    }

    expect.assertions(1);
  });
});
