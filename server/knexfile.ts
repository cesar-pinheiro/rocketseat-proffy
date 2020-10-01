import path from 'path';
import config from './src/config/database';

// sendo usada a syntax antiga do javascript devido o knex não interpretar as novas versões do mesmo.
module.exports = {
  // configuração de banco de dados SQLite
  /*
  'sqlite3',
  connection: { 
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  }, */

  // configuração de banco de dados postgres
  client: 'pg',
  connection: config,
  
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
};