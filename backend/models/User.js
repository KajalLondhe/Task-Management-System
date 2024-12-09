const mongoose = require('mongoose');
const jwt = require('jsonwebtoken'); // Required for generating the JWT token
const bcrypt=require('bcrypt')
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // You can add more fields such as `name`, `role`, etc.
});

// Method to generate JWT


userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { id: this._id, email: this.email }, // Payload
    process.env.JWT_SECRET,             // Secret key
    { expiresIn: '1h' }                 // Expiration time
  );
  return token;
};


// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10); // Hash the password
  next();
});

// Define method to compare passwords
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password); // Compare entered password with the stored hash
};

const User = mongoose.model('User', userSchema);

module.exports = User;
