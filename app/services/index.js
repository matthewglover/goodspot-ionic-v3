import chats from './chats';
import gsAuth from './auth';
import gsPubSub from './util/pub-sub';
import gsActions from './actions';
import gsDispatcher from './dispatcher';

export default (ngModule) => {
  chats(ngModule);
  gsPubSub(ngModule);
  gsDispatcher(ngModule);
  gsActions(ngModule);
  gsAuth(ngModule);
};
