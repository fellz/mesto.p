function getCookie(name) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export default function ({ $axios, store, redirect }) {
  $axios.setBaseURL(process.env.baseUrl);
  
  $axios.onRequest(request => {
    if (process.client){
      
      // For created method --> created works only on client
      // For fetch --> use nuxtServerInit method

      // set token for requests only if logged in
      if (store.state.authUser){
        $axios.setToken(store.state.authUser.jwt, 'Bearer', ['put','post', 'delete'])
      }

      const token = store.state.authUser;
      // if no token in store
      if (token == null){
        
        // get jwt from cookie
        const jwt = getCookie("jwt");
        const id = getCookie("user_id");
        
        // if jwt exists then set it to axios
        if(jwt){
          // cookie ok -> set token
          store.dispatch('setUserFromCookie', {jwt, id})        
        }
      }  
    }
  })
}