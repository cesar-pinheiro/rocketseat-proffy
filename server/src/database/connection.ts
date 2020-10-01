import knex from 'knex';
import path from 'path';

import config from '../config/database';

const db = knex({
  // configuração de banco de dados SQLite
  /*
  'sqlite3',
  connection: { 
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  }, */

  // configuração de banco de dados postgres
  client: 'pg',
  connection: config,
  
  useNullAsDefault: true
});

export default db;