import MapPlacesHelperService from './map-places-helper-services';


const gsMapPlacesHelperServiceFactory = ($rootScope, $compile) => {

  const mapPlacesHelperService = new MapPlacesHelperService({$rootScope, $compile});

  return mapPlacesHelperService;
};


export default gsMapPlacesHelperServiceFactory;
