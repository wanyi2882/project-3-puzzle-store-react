export default function authorizationHeader() {
    const user = JSON.parse(sessionStorage.getItem('user'));

    // If user exist and user stored in local storage has access token
    // store the access token insde the authorization in object
  
    if (user && user.accessToken) {
      return { Authorization: 'Bearer ' + user.accessToken };
    } else {
      return {};
    }
  }