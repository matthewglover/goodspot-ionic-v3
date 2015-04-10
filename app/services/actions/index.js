import gsActionsProvider from './provider';

export default (ngModule) => {
  ngModule.provider('gsActions', gsActionsProvider);
};
