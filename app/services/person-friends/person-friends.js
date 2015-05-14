// import {propEq, prop, pipe, find} from 'ramda';


// const getFacebookAccessToken = pipe(
//   ({identities}) => identities,
//   find(propEq('provider', 'facebook')),
//   prop('access_token')
// );
//
//
// const getUserId = prop('user_id');


export default class PersonFriends {


  __gsUser
  __profileStream


  constructor(gsUser, gsGoodspotApi) {
    this.__gsUser = gsUser;
    this.__gsGoodspotApi = gsGoodspotApi;

    this._initFacebookStream();
  }



  _initFacebookStream() {
    this.__gsUser.userIdStream
      .flatMap(personId => this._updateFriends(personId))
      .subscribe(friends => console.log('friends --->', friends));
  }


  _updateFriends(personId) {
    return this.__gsGoodspotApi.updateFriends(personId);
  }
}
