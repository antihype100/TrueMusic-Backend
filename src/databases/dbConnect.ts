import { Sequelize } from 'sequelize';

// @ts-ignore
export default new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
});
console.log(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD);
