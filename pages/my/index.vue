<template>
  <div>
    <h4>Профиль</h4>
    <hr />
    <div class="profile_my">
      <div class="profile_my_photo">
        <img :src="'http://localhost:1337' + profile.avatar" />
        <div><span class="myprofile_city">Страна:</span> {{ profile.country }}</div>
        <div><span class="myprofile_city">Город:</span> {{ profile.city }}</div>
        <div><span class="myprofile_city">Возраст:</span> {{ profile.age }}</div>
        <hr>
      </div>
      <div>
        <p v-if="userError" class="error">{{ userError }}</p>
        <div v-if="profile">
          <p>
            <span class="profile_my_name">{{ profile.name }}</span>
            <nuxt-link to="/my/edit">Edit</nuxt-link>
          </p>
          
          <div class="profile_my_wrapper">
            <p>
              <span>
                <b>Опыт:</b>
              </span>
              {{ profile.experience}}
            </p>
            <p>
              <span>
                <b>О себе:</b>
              </span>
              {{ profile.about }}
            </p>
          </div>
        </div>
        <div v-else>Пока ничего нет</div>
      </div>
    </div>
    <h5>Мои проекты</h5>
    <hr />
    <div v-if="myprojects.length > 0">
      <div v-for="project of myprojects" :key="project.id">
        <nuxt-link :to="'/projects/'+project.id">{{project.name}}</nuxt-link>
      </div>
    </div>
    <div v-else>Пока ничего нет</div>
    <br>
    <h5>Проекты, в которых я участвую</h5>
    <hr />
    <div v-if="projects.length > 0">
      <div v-for="project of projects" :key="project.id">
        <nuxt-link :to="'/projects/'+project.id">{{project.name}}</nuxt-link>
      </div>
    </div>
    <div v-else>Пока ничего нет</div>
    <br>
    <div>
      <h5> Навыки</h5>
      <hr />
      <div v-for="skill of skills" :key="skill.id">
        <span class="my_profile_skill">{{skill.skill}}</span>
      </div>
    </div>
    <br>
    <div>
      <h5>Контакты</h5>
      <hr>
      <div v-for="contact of contacts" :key="contact.id">
        <nuxt-link :to="'/profiles/' + contact.id">{{contact.fullname}}</nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profile: {},
      userError: "",
      projects: [],
      myprojects: [],
      skills: [],
      contacts: []
    };
  },
  middleware: "auth",
  async created() {
    const { data } = await axios.get(
      `http://localhost:1337/profiles/${this.$store.state.userProfile.id}`
    );
    this.profile = {
      name: data.fullname,
      about: data.about,
      experience: data.experience,
      country: data.country,
      city: data.city,
      age: data.age,
      avatar: data.avatar ? data.avatar.formats.thumbnail.url : "/uploads/thumbnail_profile_default_985f0608e3.jpeg"
    };
    this.$store.dispatch("getProfile");
  },
  watch: {
    "$store.state.userProfile": function() {
      this.projects = this.$store.state.userProfile.projects;
      this.skills = this.$store.state.userProfile.skills;
      this.contacts = this.$store.state.userProfile.contacts;
      this.myprojects = this.$store.state.userProfile.myprojects;
    }
  }
};
</script>

<style>
.profile_my_wrapper {
  background-color: #f5f3f38f;
  padding: 10px;
}
.profile_my_name {
  margin-right: 10px;
  font-size: 2rem;
}
.profile_my {
  display: flex;
}
.profile_my_photo {
  margin-right: 20px;
}
.my_profile_skill {
  margin-right: 10px;
  color: blue;
  background-color: rgb(210, 210, 210);
}
.myprofile_city {
  font-weight: bold;
}
</style>