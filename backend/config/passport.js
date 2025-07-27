import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
      authorizationParams: {
        prompt: "select_account",
        access_type: "offline",
      },
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          return done(null, existingUser);
        }

        const emailUser = await User.findOne({
          email: profile.emails[0].value,
        });

        if (emailUser) {
          emailUser.googleId = profile.id;
          emailUser.isVerified = true;

          if (!emailUser.profilePicture && profile.photos[0]) {
            emailUser.profilePicture = profile.photos[0].value;
          }

          await emailUser.save();
          return done(null, emailUser);
        }

        const newUser = new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          name: profile.name.givenName,
          surname: profile.name.familyName,
          profilePicture: profile.photos[0].value,
          isVerified: true,
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        console.error("Google OAuth error:", err);
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
