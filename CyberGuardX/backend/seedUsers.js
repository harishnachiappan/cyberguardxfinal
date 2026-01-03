const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/cyberguardx');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@cyberguardx.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12);
    const adminUser = new User({
      username: 'Administrator',
      email: 'admin@cyberguardx.com',
      password: hashedPassword,
      role: 'admin',
      profile: {
        firstName: 'Admin',
        lastName: 'User'
      }
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding users:', error);
    mongoose.disconnect();
  }
};

seedUsers();