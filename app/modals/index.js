import changeLocation from './change-location';
import addLocation from './add-location';
import viewLocation from './view-location';
import filterPanel from './filter-panel';

export default (ngModule) => {
  changeLocation(ngModule);
  addLocation(ngModule);
  viewLocation(ngModule);
  filterPanel(ngModule);
}
