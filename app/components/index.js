import gsMap from './map';
import gsMapPlaces from './map-places';
import gsMapPlaceDetails from './map-place-details';


import gsPlaceMarkerManagerService from './place-marker-manager-service';
import gsPlaceMarkerService from './place-marker-service';
import gsPlacePopupService from './place-popup-service';


import gsPlaceExplorerMap from './place-explorer-map';
import gsPlaceExplorerList from './place-explorer-list';
import gsPlaceExplorerListItem from './place-explorer-list-item';


import gsPlaceFilterWidget from './place-filter-widget';
import gsPlaceSortWidget from './place-sort-widget';

import gsMapImage from './map-image';

import gsTagTokens from './tag-tokens';
import gsTagToken from './tag-token';


import gsLocationExplorerOptionsPanel from './location-explorer-options-panel';

export default (ngModule) => {
  gsMap(ngModule);
  gsMapPlaces(ngModule);
  gsMapPlaceDetails(ngModule);
  gsPlaceMarkerManagerService(ngModule);
  gsPlaceMarkerService(ngModule);
  gsPlacePopupService(ngModule);
  gsPlaceExplorerMap(ngModule);
  gsPlaceExplorerList(ngModule);
  gsPlaceExplorerListItem(ngModule);
  gsPlaceFilterWidget(ngModule);
  gsPlaceSortWidget(ngModule);
  gsMapImage(ngModule);
  gsTagTokens(ngModule);
  gsTagToken(ngModule);
  gsLocationExplorerOptionsPanel(ngModule);
};
