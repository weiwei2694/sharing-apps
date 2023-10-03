const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const config = require('./config');
const { tokenTypes } = require('./tokens');
const prisma = require('../../prisma/client');

const jwtOptions = {
  secretOrKey: config.jwt.secret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const jwtVerify = async (payload, done) => {
  try {
    if (payload.type !== tokenTypes.ACCESS) {
      throw new Error('Invalid token type');
    }
    const user = await prisma.user.findFirst({ where: { id: payload.sub } });
    if (!user) {
      return done(null, false);
    }
    done(null, user);
  } catch (error) {
    done(error, false);
  }
};

const jwtStrategy = new JwtStrategy(jwtOptions, jwtVerify);

const localOptions = {
  usernameField: 'email',
  passwordField: 'password',
};

const localVerify = async (email, password, done) => {
  try {
    const user = await prisma.user.findFirst({
      where: { email },
    });
    if (!user) return done(null, false, { message: 'email incorrect' });

    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }
    return done(null, false, { message: 'password incorrect' });
  } catch (error) {
    done(error);
  }
};

const localStrategy = new LocalStrategy(localOptions, localVerify);

const serializeUser = (user, done) => {
  process.nextTick(function () {
    return done(null, user.id);
  });
};

const deserializeUser = (id, done) => {
  process.nextTick(async function () {
    try {
      const existingUser = await prisma.user.findUnique({
        where: { id },
      });

      done(null, existingUser);
    } catch (error) {
      done(error);
    }
  });
};

module.exports = {
  jwtStrategy,
  localStrategy,
  serializeUser,
  deserializeUser,
};
