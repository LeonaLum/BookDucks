module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '9142904535e988ae82e38c3a1afc2618'),
  },
});
