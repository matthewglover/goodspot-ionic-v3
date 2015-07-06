import User from './user';

// export default (gsAuth) => {
//   const user = new User({gsAuth});
//
//   return user;
// };


export default (gsUserEvents, jwtHelper) => new User(gsUserEvents, jwtHelper);
