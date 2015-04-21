
const POPUP_HTML =
  `<div>
    <gs-map-place-details
      place="place"
      places-key="placesKey"
      popup="popup" marker="marker"></gs-map-place-details>
   </div>`;


export default class PlacePopup {

  __popup
  __contentDirective

  constructor(place, $compile, $rootScope) {
    this._buildDirective(place, $compile, $rootScope);
    this._buildPopup();
  }


  get mapPopup() {
    return this.__popup;
  }


  get __contentDomElement() {
    return this.__contentDirective[0];
  }


  _buildPopup() {
    this.__popup = L.popup({closeButton: false});
    this.__popup.setContent(this.__contentDomElement);
  }


  _buildDirective(place, $compile, $rootScope) {
    const scope = angular.extend($rootScope.$new(), {place});
    const linkFn = $compile(angular.element(POPUP_HTML));
    this.__contentDirective = linkFn(scope);
  }
}
