import profileToPerson from './profile-to-person';

export default class Person {

  __personStream

  __gsGoodspotApi

  constructor({gsUser, gsGoodspotApi}) {
    this.__gsGoodspotApi = gsGoodspotApi;

    this.__personStream = gsUser.profileStream.map(profileToPerson);

    this._reactToPersonStream();
  }


  _reactToPersonStream() {
    this.__personStream
      .flatMap(person => this._updatePerson(person))
      .subscribe(angular.noop);
  }


  _updatePerson(person) {
    return this.__gsGoodspotApi.updatePerson(person)
  }
}
