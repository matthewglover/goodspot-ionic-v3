import locations from './locations';
import addLocation from './add-location';
import viewLocation from './view-location';
import filterPanel from './filter-panel';
import placeDetail from './place-detail';

export default (ngModule) => {
  locations(ngModule);
  addLocation(ngModule);
  viewLocation(ngModule);
  filterPanel(ngModule);
  placeDetail(ngModule);
}
