import gsPubSubProvider from './provider';

export default (ngModule) => {
  ngModule.provider('gsPubSub', gsPubSubProvider);
};
