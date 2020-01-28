const graphqlUrl = 'http://100.81.5.26:8080';
const loggedInUserUrl = 'http://100.81.5.26:3000';
const webSockWithCmsBackendUrl = 'ws://100.81.5.26:4000/websocket/tracker/websocket';

export const config = {
  GRAPHQL_URL: graphqlUrl + '/graphql',
  LOGGED_IN_USER_URL: loggedInUserUrl + '/api/user',
  WEB_SOCKET_URL_WITH_CMS_BACKEND: webSockWithCmsBackendUrl,
};
