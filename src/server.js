const { PORT } = require('./common/config');
const app = require('./app');
const { getConnection } = require('./common/db');
const userService = require('./resources/users/user.service');

const admin = { name: 'admin', login: 'admin', password: 'admin' };

const startServer = async () => {
  await getConnection();

  const adminUser = await userService.getByLogin(admin.login);
  if (!adminUser) {
    await userService.addUser(admin);
  }

  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
};

startServer();
