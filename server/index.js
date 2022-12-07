//DEPENDENCIES
const express = require('express');

const expressSession = require('express-session');

const cors = require('cors');

const helmet = require('helmet');

const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const knex = require('knex')(require('./knexfile.js').development);
//


//EXPRESS APP INSTANCE
const app = express();
const PORT = process.env.PORT || 5050;

require('dotenv').config();

app.use(express.json());

app.use(helmet());

app.use(
  cors({
    origin: true,
    credentials: true
  })
);

app.use(
  expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
//


//PASSPORT CONFIG
app.use(passport.initialize());

app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    (_accessToken, _refreshToken, profile, done) => {
      console.log('GitHub profile:', profile);

      knex('users')
        .select('id')
        .where({ github_id: profile.id })
        .then(user => {
          if (user.length) {
            done(null, user[0]);
          } else {
            knex('users')
              .insert({
                github_id: profile.id,
                avatar_url: profile._json.avatar_url,
                username: profile.username
              })
              .then(userId => {
                done(null, { id: userId[0] });
              })
              .catch(err => {
                console.log('Error creating a user', err);
              });
          }
        })
        .catch(err => {
          console.log('Error fetching a user', err);
        });
    }
  )
);


passport.serializeUser((user, done) => {
  console.log('serializeUser (user object):', user);

  done(null, user.id);
});


passport.deserializeUser((userId, done) => {
  console.log('deserializeUser (user id):', userId);

  knex('users')
    .where({ id: userId })
    .then(user => {
      console.log('req.user:', user[0]);

      done(null, user[0]);
    })
    .catch(err => {
      console.log('Error finding user', err);
    });
});



//AUTH ROUTES
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const courseRoutes = require('./routes/courses');

app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/courses', courseRoutes);


app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}.`);
});