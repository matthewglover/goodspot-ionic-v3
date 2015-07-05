import {isNil, not} from 'ramda';

import popoverTemplate from './popover-template.html';


const EMPTY_OBJECT = {};


export default class TagTokenController {


  __$scope
  __popover


  constructor($ionicPopover, $scope) {
    this.__$scope = $scope;
    this._initPopover($ionicPopover);
  }


  get tagText() {
    if (isNil(this.tag)) return EMPTY_OBJECT;
    else return `${this.tag.name}`;
  }


  get isMyTag() {
    return this.tag.isMyTag;
  }


  get isNotMyTag() {
    return not(this.isMyTag);
  }


  get totalTags() {
    return this.tag.totalTags;
  }


  get tagClass() {
    if (this.isMyTag) {
      return 'tag-token-positive';
    } else {
      return 'tag-token-stable';
    }
  }


  showOptions($event) {
    this.__popover.show($event);
  }


  untagPlace() {
    this.untagHandler({tag: this.tag.name});
    this.__popover.hide();
  }


  tagPlace() {
    this.tagHandler({tag: this.tag.name});
    this.__popover.hide();
  }


  _initPopover($ionicPopover) {
    this.__popover =
      $ionicPopover.fromTemplate(popoverTemplate, {scope: this.__$scope});
  }
}
