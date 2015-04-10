import gsDispatcherProvider from './provider';

export default (ngModule) => {
  ngModule.provider('gsDispatcher', gsDispatcherProvider);
};
