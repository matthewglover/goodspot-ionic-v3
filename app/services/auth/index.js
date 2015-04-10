import gsAuthProvider from './provider';

export default (ngModule) => {
  ngModule.provider('gsAuth', gsAuthProvider);
};
