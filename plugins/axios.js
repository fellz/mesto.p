export default function ({ $axios, store, redirect }) {
  $axios.setBaseURL(process.env.baseUrl);

}  