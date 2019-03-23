const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const { ExtractJwt } = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
const { JWT_SECRET } = require("./config");

const GooglePlusTokenStrategy = require("passport-google-plus-token");

const User = require("./models/user");

console.log(JWT_SECRET);

passport.use(
    new JwtStrategy(
        {
            jwtFromRequest: ExtractJwt.fromHeader("authorization"),
            secretOrKey: JWT_SECRET
        },
        async (payload, done) => {
            try {
                // Find the user specified in token
                const user = await User.findById(payload.sub);

                // If user doesn't exists, handle it
                if (!user) {
                    return done(null, false);
                }
                // Otherwise, return the user
                done(null, user);
            } catch (error) {
                done(error.false);
            }
        }
    )
);

passport.use(
    new LocalStrategy(
        {
            usernameField: "email"
        },
        async (email, password, done) => {
            // Find the user given the email
            const user = await User.findOne({ email });

            // If not, handle it
            if (!user) {
                return done(null, false);
            }

            // Check if the password is correct

            // If not, handle it

            // Otherwise, return the user
        }
    )
);
