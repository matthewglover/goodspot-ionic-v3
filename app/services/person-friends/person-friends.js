import {propEq, prop, pipe, find} from 'ramda';


const getFacebookId = pipe(
  ({identities}) => identities,
  find(propEq('provider', 'facebook'))
);


export default class PersonFriends {


  __gsUser
  __profileStream


  constructor(gsUser, $timeout) {
    console.log('initialising person friends');

    this.__gsUser = gsUser;

    const myStream =
      this.__gsUser.profileStream
        .replay(1);

    myStream.connect();

    myStream
      .subscribe(d => console.log(d));

    this.__gsUser.profileStream.subscribe(d => console.log('poo', d));

    $timeout(_ => {
      myStream.subscribe(d => console.log('delayed', d));
      this.__gsUser.profileStream.subscribe(d => console.log('poo', d));
    }, 1000);

    // this._initProfileStream();
    // this._initFacebookStream();
  }


  // get __USER_PROFILE_LOADED() {
  //   return this.__gsAuth.USER_PROFILE_LOADED;
  // }
  //
  //
  // _initProfileStream(authStream) {
  //   this.__profileStream =
  //     this.__gsAuth.eventStream
  //       .filter(propEq('eventType', this.__USER_PROFILE_LOADED))
  //       .map(prop('profile'));
  //
  //     // .subscribe(profile => console.log('--->', d));
  // }
  //
  //
  // _initFacebookStream() {
  //   this.__profileStream
  //     .map(getFacebookId)
  //     .subscribe(facebookId => console.log('...', facebookId));
  // }
}
