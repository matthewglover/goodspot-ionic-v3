import {merge} from 'ramda';
import buildActions from './build-actions';


// _ -> Provider
const gsActionsProvider = (gsDispatcherProvider) => {

  const actions = buildActions(gsDispatcherProvider);

  return merge(actions, {$get: () => actions});
}


export default gsActionsProvider;
