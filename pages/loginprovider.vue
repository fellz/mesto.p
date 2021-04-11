<template>
  <div>
    <a :href="url + '/connect/google'">Войти через Google</a>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: process.env.baseUrl,
    };
  },
};
</script>
