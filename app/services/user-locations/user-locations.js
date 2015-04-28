import Rx from 'rxjs/dist/rx.lite';

export default class UserLocations {

  __gsGoodspotApi
  __userIdStream

  __userIdCache


  constructor({gsGoodspotApi, gsUser}) {
    this.__gsGoodspotApi = gsGoodspotApi;
    this.__userIdStream = gsUser.userIdStream;

    this._reactToUserId();
  }


  _search(userId) {
    return this.__gsGoodspotApi.searchPersonLocations(userId);
  }


  _reactToUserId() {
    this.__userIdStream
      .do(userId => this.__userIdCache = userId)
      .flatMap(userId => this._search(userId))
      .subscribe(v => console.log('---->>>', v));
  }
}
