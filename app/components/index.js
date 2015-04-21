import gsMap from './map';
import gsMapPlaces from './map-places';
import gsMapPlacesHelperService from './map-places-helper-service';
import gsMapPlaceDetails from './map-place-details';
import gsPlaceMarkerManagerService from './place-marker-manager-service';
import gsPlaceMarkerService from './place-marker-service';
import gsPlacePopupService from './place-popup-service';

export default (ngModule) => {
  gsMap(ngModule);
  gsMapPlacesHelperService(ngModule);
  gsMapPlaces(ngModule);
  gsMapPlaceDetails(ngModule);
  gsPlaceMarkerManagerService(ngModule);
  gsPlaceMarkerService(ngModule);
  gsPlacePopupService(ngModule);
};
