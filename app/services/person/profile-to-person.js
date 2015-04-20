import {pipe, pick, toPairs, map, eq, fromPairs} from 'ramda';


export default pipe(
  pick(['user_id', 'name']),
  toPairs,
  map(([k, v]) => [eq(k, 'user_id') ? '_uid' : k, v]),
  fromPairs
);
