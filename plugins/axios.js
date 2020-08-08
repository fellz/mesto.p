export default function ({ $axios }) {
  $axios.setBaseURL(process.env.baseUrl);
}