import User from './user';

export default (gsAuth) => {
  const user = new User({gsAuth});

  return user;
};
