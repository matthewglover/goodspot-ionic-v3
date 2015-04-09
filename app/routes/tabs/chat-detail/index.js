
const TAB_CHAT_DETAIL_ROUTE_CONFIG = {
  url: '/chats/:chatId',
  views: {
    'tab-chats': {
      template: require('./index.html'),
      controller: 'ChatDetailCtrl'
    }
  }
};


const configTabChatDetailRoute = ($stateProvider) =>
  $stateProvider.state('tab.chat-detail', TAB_CHAT_DETAIL_ROUTE_CONFIG);



const ChatDetailController = ($scope, $stateParams, Chats) => {
  $scope.chat = Chats.get($stateParams.chatId);
};


export default (ngModule) => {

  ngModule.config(configTabChatDetailRoute);

  ngModule.controller('ChatDetailCtrl', ChatDetailController);
};
