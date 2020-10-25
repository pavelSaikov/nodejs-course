const { PORT } = require('./common/config');
const app = require('./app');
const { getConnection } = require('./common/db');

const startServer = async () => {
  await getConnection();

  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
};

startServer();
