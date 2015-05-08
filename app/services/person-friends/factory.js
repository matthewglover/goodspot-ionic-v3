import PersonFriends from './person-friends';


export default (gsUser, $timeout) =>
  new PersonFriends(gsUser, $timeout);
