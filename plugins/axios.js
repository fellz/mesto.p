export default function ({ $axios, store, redirect }) {
  $axios.setBaseURL(process.env.baseUrl);

  $axios.onRequest(() => {
    const isUser = store.state.authUser;
    const noUserProfile = !store.state.userProfile;
    if (Boolean(isUser) && noUserProfile) {
      redirect('/profiles/auth/new');
    }
  });
}
