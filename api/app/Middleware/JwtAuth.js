'use strict';

class JwtAuth {
  // eslint-disable-next-line consistent-return
  async handle ({ response, auth }, next) {
    // call next to advance the request
    try {
      const user = await auth.getUser();
      if (user.banned) {
        return response.status(403).json({ message: 'You are banned from this site.' });
      }
    } catch (error) {
      console.log(error);
      return response.status(401).json({ message: 'Missing or invalid token' });
    }
    await next();
  }
}

module.exports = JwtAuth;
