import dotenv from "dotenv";
dotenv.config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret:
                process.env.GOOGLE_CLIENT_SECRET,
            callbackURL:
                "https://cv-strore.onrender.com/api/auth/google/callback",
        },

        async (
            accessToken,
            refreshToken,
            profile,
            done
        ) => {

            try {

                let user = await User.findOne({
                    email:
                        profile.emails[0].value,
                });

                if (!user) {

                    user = await User.create({
                        googleId:
                            profile.id,
                        name:
                            profile.displayName,
                        email:
                            profile.emails[0].value,
                        profilePhoto:
                            profile.photos?.[0]?.value || "",
                    });

                } else {

                    user.googleId =
                        profile.id;

                    user.profilePhoto =
                        profile.photos?.[0]?.value ||
                        user.profilePhoto;

                    await user.save();

                }

                done(null, user);

            } catch (error) {

                done(error, null);

            }

        }
    )
);

console.log("GOOGLE_CLIENT_ID =", process.env.GOOGLE_CLIENT_ID);
console.log("GOOGLE_CLIENT_SECRET =", process.env.GOOGLE_CLIENT_SECRET);

passport.serializeUser(
    (user, done) => {
        done(null, user.id);
    }
);

passport.deserializeUser(
    async (id, done) => {

        try {

            const user =
                await User.findById(id);

            done(null, user);

        } catch (error) {

            done(error, null);

        }

    }
);

export default passport;