module.exports = {
  googleClientID:
    '964808011168-29vqsooppd769hk90kjbjm5gld0glssb.apps.googleusercontent.com',
  googleClientSecret: 'KnH-rZC23z4fr2CN4ISK4srN',
  mongoURI: 'mongodb://zdm_admin:wanted09@ds157383.mlab.com:57383/blog_dev',
  cookieKey: '123123123', // Secret key for signing the base64 session encoding.
  redisUrl: 'redis://127.0.0.1:6379',
  accessKeyId: process.env.AWS_ACCCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
};
