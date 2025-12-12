// create_blog_table.js
const { createClient } = require('@libsql/client');
require('dotenv').config();

const client = createClient({
  url: process.env.TURSO_DATABASE_URL,
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const createTableSQL = `
CREATE TABLE blog_posts (
  id text PRIMARY KEY NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  image_url text,
  author text NOT NULL,
  created_at integer NOT NULL,
  updated_at integer NOT NULL
);
`;

async function createTable() {
  try {
    await client.execute(createTableSQL);
    console.log('Tabla blog_posts creada exitosamente');
  } catch (error) {
    console.error('Error creando tabla:', error);
  } finally {
    client.close();
  }
}

createTable();