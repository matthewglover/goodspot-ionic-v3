import {propEq, prop, pipe, find} from 'ramda';


const getFacebookAccessToken = pipe(
  ({identities}) => identities,
  find(propEq('provider', 'facebook')),
  prop('access_token')
);


const getUserId = prop('user_id');


export default class PersonFriends {


  __gsUser
  __profileStream


  constructor(gsUser, gsGoodspotApi) {
    this.__gsUser = gsUser;
    this.__gsGoodspotApi = gsGoodspotApi;

    this._initFacebookStream();
  }



  _initFacebookStream() {
    this.__gsUser.profileStream
      .map(profile => [getUserId(profile), getFacebookAccessToken(profile)])
      .do(data => console.log(data))
      .subscribe(([personId, facebookToken]) => this._updateFriends(personId, facebookToken));
  }


  _updateFriends(personId, facebookToken) {
    this.__gsGoodspotApi.updateFriends(personId, facebookToken);
  }
}
