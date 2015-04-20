import {forEach, partial} from 'ramda';

const addMarkerToLayer = (layer, marker) =>
  layer.addLayer(marker);


const addMarkersToLayer = (layer, markers) =>
  forEach(partial(addMarkerToLayer, layer), markers);


export default addMarkersToLayer;
