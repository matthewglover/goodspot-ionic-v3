import {partial, map} from 'ramda';
import {IONIC_COLORS} from '../../app-constants';

// *****************************************************************************
// BUILD POPUP
// *****************************************************************************

const buildPopup = ($rootScope, $compile, marker, place) => {
  const popup = L.popup({closeButton: false});

  const content = buildPopupContent({$rootScope, $compile, marker, place, popup});

  popup.setContent(content);

  return popup;
};


const buildPopupContent = ({$rootScope, $compile, marker, place, popup}) => {
  const htmlContent =
    `<div>
      <gs-map-place-details
        place="place"
        places-key="placesKey"
        popup="popup" marker="marker"></gs-map-place-details>
     </div>`;

  const linkFunction = $compile(angular.element(htmlContent));

  const newScope = angular.extend($rootScope.$new(), {marker, place, popup});

  return linkFunction(newScope)[0];
};




// *****************************************************************************
// BUILD PLACE MARKER
// *****************************************************************************


const markerColor = (place) => {
  if (place.isMyGoodspot) return IONIC_COLORS.$assertive;
  // if (Place.isFriendspot(place)) return IONIC_COLORS.$energized;
  // if (Place.isGoodspot(place)) return IONIC_COLORS.$positive;
  return IONIC_COLORS.$stable;
}


const buildPlaceMarkerIcon = (place) =>
  L.mapbox.marker.icon({
    'marker-size': 'large',
    'marker-symbol': 'marker-stroked',
    'marker-color': markerColor(place)
  });


const buildPlaceMarker = ($rootScope, $compile, place) => {

  const markerOptions = {title: place.name, icon: buildPlaceMarkerIcon(place)}

  const marker = L.marker(place.pos, markerOptions);

  const popup = buildPopup($rootScope, $compile, marker, place);

  marker.bindPopup(popup);

  return marker;
}

const buildPlaceMarkers = ($rootScope, $compile, places) =>
  map(partial(buildPlaceMarker, $rootScope, $compile), places);

export default buildPlaceMarkers;
