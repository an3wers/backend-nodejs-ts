export const getDbConfig = () => {
  return {
    user: process.env.USER_DB,
    host: process.env.HOST_DB,
    database: process.env.NAME_DB,
    password: process.env.PASW_DB,
    port: process.env.PORT_DB,
  };
};
