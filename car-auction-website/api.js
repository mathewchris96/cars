// api.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const { Car, User } = require('./database.js');

// Middleware to authenticate using JWT in the request headers
const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  })(req, res, next);
};

// User authentication endpoint
router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      // Generate a signed JWT token
      const token = jwt.sign(user.toJSON(), 'secret', { expiresIn: '1h' }); // 'secret' should be replaced with a real secret key
      return res.json({ user, token });
    });
  })(req, res);
});

// Endpoint to get a list of cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Endpoint to post a new car listing
router.post('/cars', authenticateJWT, async (req, res) => {
  const car = new Car({
    make: req.body.make,
    model: req.body.model,
    year: req.body.year,
    type: req.body.type,
    startingBid: req.body.startingBid,
    currentBid: req.body.startingBid,
    bidHistory: [],
    images: req.body.images,
    description: req.body.description,
    postedBy: req.user._id
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Endpoint to place a bid on a car
router.post('/cars/:id/bid', authenticateJWT, async (req, res) => {
  const { bid } = req.body;
  try {
    const car = await Car.findById(req.params.id);
    if (bid <= car.currentBid) {
      return res.status(400).json({ message: "Your bid must be higher than the current bid." });
    }
    car.currentBid = bid;
    car.bidHistory.push({ bidder: req.user._id, bid: bid, bidTime: new Date() });
    await car.save();
    res.json(car);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
