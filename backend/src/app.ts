import express from 'express';
import mongoose from 'mongoose';
import passport from 'passport';
import bodyParser from 'body-parser';


mongoose.connect('mongodb+srv://meritaward:award@cluster0.ioc7w.mongodb.net/meritaward-dev?retryWrites=false&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.on('error', error => console.log(error) );

require('./auth/auth');

import routes from '../src/router/authRoutes';
import secureRoute from '../src/router/profileRoutes';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/user', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/api/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err: any, req: any, res: any, next: any) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(8000, () => {
  console.log('Server started.')
});