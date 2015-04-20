import gsMap from './map';
import gsMapPlaces from './map-places';
import gsMapPlacesHelperService from './map-places-helper-service';
import gsMapPlaceDetails from './map-place-details';

export default (ngModule) => {
  gsMap(ngModule);
  gsMapPlacesHelperService(ngModule);
  gsMapPlaces(ngModule);
  gsMapPlaceDetails(ngModule);
};
