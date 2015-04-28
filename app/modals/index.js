import changeLocation from './change-location';
import addLocation from './add-location';
import viewLocation from './view-location';

export default (ngModule) => {
  changeLocation(ngModule);
  addLocation(ngModule);
  viewLocation(ngModule);
}
