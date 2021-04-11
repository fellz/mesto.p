<template>
  <v-row justify="center">
    <v-col xm="12" sm="9" md="7">
      <h4>Заполните пожалуйста ваш профиль!</h4>
      <v-form ref="form">
        <v-text-field
          v-model="fullname"
          :error-messages="fullnameErrors"
          :counter="30"
          label="Полное имя ( Иван Петров)"
          required
          @input="$v.fullname.$touch()"
          @blur="$v.fullname.$touch()"
        ></v-text-field>

        <v-textarea
          v-model="about"
          :error-messages="aboutErrors"
          :counter="2000"
          auto-grow
          label="О себе"
          value="Расскажите о себе и о своем опыте."
        ></v-textarea>

        <v-text-field
          v-model="country"
          :error-messages="countryErrors"
          :counter="20"
          label="Страна"
          @input="$v.country.$touch()"
          @blur="$v.country.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="city"
          :error-messages="cityErrors"
          :counter="20"
          label="Город"
          @input="$v.city.$touch()"
          @blur="$v.city.$touch()"
        ></v-text-field>

        <v-text-field
          v-model="url"
          :error-messages="urlErrors"
          :counter="50"
          label="Ссылка на личный сайт"
          @input="$v.url.$touch()"
          @blur="$v.url.$touch()"
        ></v-text-field>

        <v-btn class="mr-4" @click="submit">submit</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
/* eslint-disable no-unused-expressions */
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  name: 'ProfileNew',
  validations: {
    fullname: { required, maxLength: maxLength(30) },
    about: { maxLength: maxLength(2000) },
    country: { maxLength: maxLength(20) },
    city: { maxLength: maxLength(20) },
    url: { maxLength: maxLength(50) },
  },

  data: () => ({
    fullname: '',
    about: '',
    country: '',
    city: '',
    url: '',
  }),

  computed: {

    fullnameErrors() {
      const errors = [];
      if (!this.$v.fullname.$dirty) return errors;
      !this.$v.fullname.maxLength && errors.push('Name must be at most 30 characters long');
      !this.$v.fullname.required && errors.push('Name is required.');
      return errors;
    },
    aboutErrors() {
      const errors = [];
      if (!this.$v.about.$dirty) return errors;
      !this.$v.about.maxLength && errors.push('Не более 2000 символов');
      return errors;
    },
    countryErrors() {
      const errors = [];
      if (!this.$v.country.$dirty) return errors;
      !this.$v.country.maxLength && errors.push('Name must be at most 15 characters long');
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.city.$dirty) return errors;
      !this.$v.city.maxLength && errors.push('Name must be at most 20 characters long');
      return errors;
    },
    urlErrors() {
      const errors = [];
      if (!this.$v.url.$dirty) return errors;
      !this.$v.url.maxLength && errors.push('Name must be at most 50 characters long');
      return errors;
    },
  },

  methods: {
    async submit() {
      this.$v.$touch();

      // Create profile
      const profile = {
        fullname: this.fullname,
        about: this.about,
        country: this.country,
        city: this.city,
        url: this.url,
        user: this.$store.state.authUser.user.id,
      };

      const resp = await this.$axios.$post('/profiles', profile);

      // Set profile to the store
      this.$store.dispatch('setProfile', { profile: resp });

      // Set cookie
      document.cookie = `profile_id=${resp.id};max-age=10800`;

      // Redirect to profile
      this.$router.replace('/my/auth');
    },
  },
};
</script>
