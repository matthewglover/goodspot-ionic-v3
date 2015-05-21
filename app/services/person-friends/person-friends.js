

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
      .subscribe(angular.noop);
  }


  _updateFriends(personId) {
    return this.__gsGoodspotApi.updateFriends(personId);
  }
}
