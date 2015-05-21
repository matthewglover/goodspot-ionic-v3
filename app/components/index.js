import gsMap from './map';
import gsMapPlaces from './map-places';
import gsMapPlaceDetails from './map-place-details';


import gsPlaceMarkerManagerService from './place-marker-manager-service';
import gsPlaceMarkerService from './place-marker-service';
import gsPlacePopupService from './place-popup-service';


import gsPlaceExplorerMap from './place-explorer-map';
import gsPlaceExplorerList from './place-explorer-list';


import gsMapImage from './map-image';


export default (ngModule) => {
  gsMap(ngModule);
  gsMapPlaces(ngModule);
  gsMapPlaceDetails(ngModule);
  gsPlaceMarkerManagerService(ngModule);
  gsPlaceMarkerService(ngModule);
  gsPlacePopupService(ngModule);
  gsPlaceExplorerMap(ngModule);
  gsPlaceExplorerList(ngModule);
  gsMapImage(ngModule);
};
