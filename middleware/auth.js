// eslint-disable-next-line func-names
// eslint-disable-next-line consistent-return
export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.state.authUser) {
    return redirect('/login');
  }
}
