import {isNil} from 'ramda';


export default class TagTokensController {


  constructor() {
  }


  get tags() {
    if (isNil(this.place)) return [];
    else return this.place.tags;
  }


  untagPlace(tag) {
    if (isNil(this.untagHandler)) return;
    this.untagHandler({tag});
  }


  tagPlace(tag) {
    if (isNil(this.tagHandler)) return;
    this.tagHandler({tag});
  }
}
