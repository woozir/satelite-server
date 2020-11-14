// eslint-disable-next-line
require('dotenv').config();

let config;
switch (process.env.NODE_ENV) {
  case 'test':
    config = {
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'maz-dev',
      password: '',
      database: 'woozirtest',
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
    break;
  case 'prod':
    config = {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
  default:
    config = {
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity.js'],
      migrations: ['dist/migrations/*.js'],
      cli: {
        migrationsDir: 'src/migrations',
      },
    };
}

module.exports = config;
