const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/webuydeadstocks';

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

const Admin = mongoose.models.Admin || mongoose.model('Admin', adminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const existing = await Admin.findOne({ email: 'info@webuydeadstocks.com' });
  if (existing) {
    console.log('Admin already exists — deleting and recreating...');
    await Admin.deleteOne({ email: 'info@webuydeadstocks.com' });
  }

  const hashedPassword = await bcrypt.hash('wbds@2456', 10);
  await Admin.create({ email: 'info@webuydeadstocks.com', password: hashedPassword });

  console.log('✅ Admin created!');
  console.log('   Email:    info@webuydeadstocks.com');
  console.log('   Password: wbds@2456');

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
