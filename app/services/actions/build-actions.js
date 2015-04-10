import {merge} from 'ramda';
import {LOGIN, LOGOUT} from '../../app-constants';

const buildActions = (gsDispatcherProvider) => {

  const dispatcher = gsDispatcherProvider.getDispatcher();


  const dispatchPayload = (actionType, payload) => {
    const dispatchPayload = merge({actionType}, payload);
    console.log(dispatchPayload);
    dispatcher.dispatch(dispatchPayload);
  }

  const Actions = {

    login: (payload) => dispatchPayload(LOGIN, payload),


    logout: (payload) => dispatchPayload(LOGOUT, payload)

  };


  return Actions;
};


export default buildActions;
