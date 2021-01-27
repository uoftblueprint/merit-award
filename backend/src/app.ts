import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI ?? '';

mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', error => console.log(error) );

require('./auth/auth');

import routes from '../src/router/authRoutes';
import secureRoute from '../src/router/profileRoutes';
import studentRoutes from '../src/router/studentRoutes';
import formRoutes from '../src/router/formRoutes'

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', routes);
app.use('/api/forms', formRoutes)

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api/user', passport.authenticate('jwt', { session: false }), secureRoute);
app.use('/api/student', passport.authenticate('jwt', { session: false }), studentRoutes);

// Handle errors.
app.use(function(err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({ error: err });
});

// Setup view engine.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.listen(8000, () => {
  console.log('Server started.')
});