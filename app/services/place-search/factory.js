import PlaceSearch from './place-search';


export default (gsFactualSearch, gsGoodspotApi) => {
  const placeSearch = new PlaceSearch({gsFactualSearch, gsGoodspotApi});

  return placeSearch;
};
