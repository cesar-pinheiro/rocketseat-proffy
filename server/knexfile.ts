import path from 'path';

// sendo usada a syntax antiga do javascript devido o knex não interpretar as novas versões do mesmo.
module.exports = {
  client: 'sqlite3',
  connection: { 
    filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite')
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  useNullAsDefault: true
};