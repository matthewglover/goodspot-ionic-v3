import {filter, propEq, always, isNil, complement} from 'ramda';


const isNotNil = complement(isNil);


export const isMyGoodspot = propEq('isMyGoodspot', true);


const isFriendSpot = ({friendSpots}) =>
  isNotNil(friendSpots) && friendSpots > 0;


export const isFriendOrMyGoodspot = (place) =>
  isFriendSpot(place) || isMyGoodspot(place);


export const isGoodspot = (place) =>
  place.placeType === 'goodspot' && place.totalSpots > 0;


export const PLACE_FILTERS= [
  {
    description: 'Just my goodspots',
    filter: filter(isMyGoodspot)
  },
  {
    description: 'Just my goodspots and friendspots',
    filter: filter(isFriendOrMyGoodspot)
  },
  {
    description: 'All goodspots',
    filter: filter(isGoodspot)
  },
  {
    description: 'Everything',
    filter: filter(always(true))
  }
];
