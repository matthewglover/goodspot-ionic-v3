
const logoutHandler = (loginState) =>
  /* ngInject */
  ($state) => $state.go(loginState);


export default logoutHandler;
