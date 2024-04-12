// database.js
const mongoose = require('mongoose');

// Define the schema for the users
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

// Define the schema for the cars
const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: ['SUV', 'Sedan', 'Hatchback']
  },
  startingBid: {
    type: Number,
    required: true
  },
  currentBid: {
    type: Number,
    required: true
  },
  bidHistory: [{
    bidder: String,
    bid: Number,
    bidTime: Date
  }],
  images: [String], // URLs to images of the car
  description: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create models from the schemas
const User = mongoose.model('User', userSchema);
const Car = mongoose.model('Car', carSchema);

// Function to connect to the MongoDB database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Exit process with failure
    process.exit(1);
  }
};
