import template from './index.html';

const TAB_CHATS_ROUTE_CONFIG = {
  url: '/chats',
  views: {
    'tab-chats': {
      template,
      controller: 'ChatsCtrl'
    }
  }
};


const configTabChatsRoute = ($stateProvider) =>
  $stateProvider.state('tab.chats', TAB_CHATS_ROUTE_CONFIG);



const ChatsController = ($scope, Chats) => {
  $scope.chats = Chats.all();
  $scope.remove = (chat) => Chats.remove(chat);
};


export default (ngModule) => {

  ngModule.config(configTabChatsRoute);

  ngModule.controller('ChatsCtrl', ChatsController);
};
