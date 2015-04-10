import {merge} from 'ramda';
import {Dispatcher} from 'flux';


const dispatcher = new Dispatcher();


const gsDispatcherProvider = () =>
  ({
    getDispatcher: () => dispatcher,
    $get: () => dispatcher
  });


export default gsDispatcherProvider;
