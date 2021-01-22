import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import passportCustom from 'passport-custom';

const localStrategy = passportLocal.Strategy;
const CustomStrategy = passportCustom.Strategy;
const JWTstrategy = passportJwt.Strategy;
const ExtractJWT = passportJwt.ExtractJwt;

import UserModel from '../models/User';
import { JWT_SECRET } from '../constants';
import { Student, Counselor } from '../models/UserType';
import User from '../models/User';

passport.use(
    'signup',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email: string, password: string, done: any) => {
        try {
          const user = await UserModel.create({ email, password });
          const student = await Student.create({ user: user._id });
          user.student = student._id;
          await user.save();
          return done(null, user);
        } catch (error) {
          done(error);
        }
      }
    )
);

// passport.use(
//     'signupCounselor',
//     new customStrategy(
//       {
//         usernameField: 'email',
//         passwordField: 'password',
//         urlField: 'url',
//       },
//       async (email: string, password: string, url: string, done: any) => {
//         try {
//           const user = await UserModel.create({ email, password });
//           const counselor = await Counselor.create({ user: user._id });
//           user.counselor = counselor._id;
//           await user.save();

//           return done(null, user);
//         } catch (error) {
//           done(error);
//         }
//       }
//     )
// );

passport.use(
  'signupCounselor',
  new CustomStrategy(
    async (req, done) => {
      try {
        const student = await Student.findOne({ counselorReferral: req.body.url })
        if (!student) {
          done(Error('Invalid Referral Url :('));
        }
        const user = await UserModel.create({ email: req.body.email, password: req.body.password });
        const counselor = await Counselor.create({ user: user._id });
        user.counselor = counselor._id;
        counselor.students = [student._id];
        await counselor.save();
        await user.save();
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
    'login',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email: string, password: string, done: any) => {
        try {
          const user = await UserModel.findOne({ email });
  
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
  
          const validate = await user.isValidPassword(password);
  
          if (!validate) {
            return done(null, false, { message: 'Wrong Password' });
          }
  
          return done(null, user, { message: 'Logged in Successfully' });
        } catch (error) {
          return done(error);
        }
      }
    )
);


passport.use(
  new JWTstrategy(
    {
      secretOrKey: JWT_SECRET,
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    },
    async (token: any, done: any) => {
      try {
        const user = await User.findById(token.user._id);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

