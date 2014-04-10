var database;
if (process.env.NODE_ENV === 'production') {
  database = {
    client: 'pg',
    connection: process.env.DATABASE_URL
  };
} else {
  database = {
    client: 'sqlite3',
    connection: {
      filename: './devdb.sqlite'
    }
  }
}

module.exports = {
  database: database,
  directory: './migrations',
  tableName: 'migrations'
};


