import {has, pick, isNil, prop, propEq, merge, complement} from 'ramda';
import Rx from 'rxjs/dist/rx.lite';


const isNotNil = complement(isNil);


const transformPlaces = (places, transformer) => {
  return transformer(places);
};



const getSearchCriteriaSignature = ([personId, location]) =>
  `${personId}|${location.countryCode}|${location.pos[0]}|${location.pos[1]}`;


export default class PlaceSearchManager {

  __gsPlaceSearch
  __gsUser

  __gsPlaceSpotEventListener
  __gsPlaceUnspotEventListener
  __gsPlaceTagEventListener
  __gsPlaceUntagEventListener

  __placeSpotStream
  __placeUnspotStream
  __placeTagStream
  __placeUntagStream


  __activeLocationStream
  __searchResultsStream


  constructor({
    gsLocationManager,
    gsPlaceSearch,
    gsUser,
    gsPlaceSpotEventListener,
    gsPlaceUnspotEventListener,
    gsPlaceTagEventListener,
    gsPlaceUntagEventListener
  }) {
    this.__gsPlaceSpotEventListener = gsPlaceSpotEventListener;
    this.__gsPlaceUnspotEventListener = gsPlaceUnspotEventListener;
    this.__gsPlaceTagEventListener = gsPlaceTagEventListener;
    this.__gsPlaceUntagEventListener = gsPlaceUntagEventListener;

    this.__activeLocationStream = gsLocationManager.selectedLocationStream;

    this.__placeSpotStream = gsPlaceSpotEventListener.eventStream;
    this.__placeUnspotStream = gsPlaceUnspotEventListener.eventStream;

    this.__placeTagStream = gsPlaceTagEventListener.eventStream;
    this.__placeUntagStream = gsPlaceUntagEventListener.eventStream;

    this.__gsPlaceSearch = gsPlaceSearch;
    this.__gsUser = gsUser;

    this._reactToActiveLocationStream();

    this._initSearchResultsStream();
  }


  get searchResultsStream() {
    return this.__searchResultsStream;
  }


  get __SPOT_PLACE() {
    return this.__gsPlaceSpotEventListener.SPOT_PLACE;
  }


  get __PLACE_SPOTTED() {
    return this.__gsPlaceSpotEventListener.PLACE_SPOTTED;
  }


  get __PLACE_UNSPOTTED() {
    return this.__gsPlaceUnspotEventListener.PLACE_UNSPOTTED;
  }


  get __PLACE_TAGGED() {
    return this.__gsPlaceTagEventListener.PLACE_TAGGED;
  }


  get __PLACE_UNTAGGED() {
    return this.__gsPlaceUntagEventListener.PLACE_UNTAGGED;
  }


  _reactToActiveLocationStream() {
    this.__onActiveLocationUpdatedStream =
      this.__activeLocationStream
        .filter(has('countryCode'))
        .map(pick(['pos', 'countryCode']))
        .replay(1);

    this.__onActiveLocationUpdatedStream.connect();

    this.__onActiveLocationUpdatedStream.subscribe(angular.noop);
  }


  get __placeSpottedStream() {
    return this.__placeSpotStream
      .filter(propEq('eventType', this.__PLACE_SPOTTED));
  }



  get __placeUnspottedStream() {
    return this.__placeUnspotStream
      .filter(propEq('eventType', this.__PLACE_UNSPOTTED));
  }


  get __placeTaggedStream() {
    return this.__placeTagStream
      .filter(propEq('eventType', this.__PLACE_TAGGED));
  }


  get __placeUntaggedStream() {
    return this.__placeUntagStream
      .filter(propEq('eventType', this.__PLACE_UNTAGGED));
  }


  _initSearchResultsStream() {

    const eventStream =
      this.__placeSpottedStream
        .merge(this.__placeUnspottedStream)
        .merge(this.__placeTaggedStream)
        .merge(this.__placeUntaggedStream)
        .merge(this.__onActiveLocationUpdatedStream);


    const comboStream =
      Rx.Observable.combineLatest(
        this.__gsUser.userIdStream,
        this.__onActiveLocationUpdatedStream,
        eventStream,
        (a, b, c) => [a, b, c]
      );


    const newSearchResultsStream =
      comboStream
        .distinctUntilChanged(getSearchCriteriaSignature)
        .flatMap(([personId, location]) => this._searchLocation(personId, location));


    const updatedSearchResultsStream =
      comboStream
        .filter(([ , , eventObj]) => isNotNil(eventObj.eventType))
        .flatMap(data => this._updateSearchResults(data))
        .publish();

    updatedSearchResultsStream.connect();


    this.__searchResultsStream =
      newSearchResultsStream
        .merge(updatedSearchResultsStream)
        .replay(1);


    this.__searchResultsStream.connect();
  }


  _searchLocation(personId, location) {
    return this.__gsPlaceSearch.searchLocation(personId, location);
  }


  _updateSearchResults([personId, location, {transformer}]) {
    const updatedStream =
      this.__gsPlaceSearch.resultsStream
        .map(({location, places}) => ({
          location,
          places: transformPlaces(places, transformer)
        }))
        .replay(1);

    updatedStream.connect();

    this.__gsPlaceSearch.resultsStream = updatedStream;

    return updatedStream;
  }
}
