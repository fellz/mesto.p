export default function ({ $axios, store, redirect }) {
  $axios.setBaseURL(process.env.baseUrl);

  $axios.onRequest(()=>{
    if(store.state.authUser && !store.state.userProfile)
    redirect('/profiles/auth/new')
  })
}  