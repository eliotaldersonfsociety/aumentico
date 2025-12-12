const { db } = require('./lib/db');
const { users } = require('./drizzle/schema');
const { hash } = require('bcryptjs');

async function createAdmin() {
  try {
    const hashedPassword = await hash('admin123', 10);

    await db.insert(users).values({
      name: 'Admin',
      email: 'admin@aumentodeseguidores.com',
      password: hashedPassword,
      phone: '1234567890',
      role: 'admin',
      balance: 0,
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@aumentodeseguidores.com');
    console.log('Password: admin123');
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin();