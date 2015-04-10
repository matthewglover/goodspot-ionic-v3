const onLocationChangeStartListener = (gsAuth) =>
  () => {
    if (gsAuth.isAuthenticated) return;

    if (gsAuth.isNoToken()) return;

    if (gsAuth.isValidToken()) {
      gsAuth.authenticate();
      return;
    }

    if (gsAuth.refreshToken) {
      gsAuth.refreshAndAuthenticate();
      return;
    }
  };


export default onLocationChangeStartListener;
