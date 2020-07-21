<template>
  <div>
    <h4>Профиль</h4>
    <hr />
    <div class="myprofile">
      <div class="myprofile_photo">
        <div><nuxt-link to="/my/edit_photo">изменить фото</nuxt-link></div>
        <div>
          <img :src="base_url + profile.avatar" />
        </div>
        <div>
          <span>Страна:</span>
          {{ profile.country }}
        </div>
        <div>
          <span>Город:</span>
          {{ profile.city }}
        </div>
        <div>
          <span>Возраст:</span>
          {{ profile.age }}
        </div>
        <hr />
      </div>
      <div class="myprofile_main">
        <p>
          <span class="myprofile_main-name">{{ profile.name }}</span>
          <nuxt-link to="/my/edit_main">изменить описание</nuxt-link>
        </p>
        <div class="myprofile_main-background">
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
    </div>
    <h5>Мои проекты</h5>
    <hr />
    <div v-if="myprojects && myprojects.length > 0">
      <div v-for="project of myprojects" :key="project.id">
        <nuxt-link :to="'/projects/'+project.id">{{project.name}}</nuxt-link>
      </div>
    </div>
    <div v-else>Пока ничего нет</div>
    <br />
    
    <div >
      <h5>Мои заявки</h5>
      <hr />
      <div v-for="req of profile.project_requests" :key="req.id">
        <span>{{req.name}}</span>
        <nuxt-link :to="'/projects/' + req.project">{{ req.project }}</nuxt-link>
      </div>
    </div>
    <br/>
    <div >
      <h5>Участвую в проектах</h5>
      <hr />
      <div v-for="p of profile.projects" :key="p.id">
        <nuxt-link :to="'/projects/' + p.id">{{ p.name }}</nuxt-link>
      </div>
    </div>
    <br />
    <div>
      <span class="myprofile_skills-font">Навыки</span>
      <nuxt-link to="/my/edit_skills">изменить</nuxt-link>
      <hr />
      <div v-for="skill of skills" :key="skill.id">
        <span class="myprofile_skill">{{skill.skill}}</span>
      </div>
    </div>
    <br />
    <div>
      <h5>Контакты</h5>
      <hr />
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
      contacts: [],
      base_url: process.env.baseUrl
    };
  },
  middleware: "auth",
  async created() {
    const { data } = await axios.get(
      `${process.env.baseUrl}/profiles/${this.$store.state.userProfile.id}`
    );
    this.profile = {
      name: data.fullname,
      about: data.about,
      experience: data.experience,
      country: data.country,
      city: data.city,
      age: data.age,
      project_requests : data.project_requests,
      avatar: data.avatar
        ? data.avatar.formats.thumbnail.url
        : `${process.env.defAvatar}`
    };
    this.$store.dispatch("getProfile");
  },
  watch: {
    "$store.state.userProfile": function() {
      this.profile.projects = this.$store.state.userProfile.projects;
      this.skills = this.$store.state.userProfile.skills;
      this.contacts = this.$store.state.userProfile.contacts;
      this.myprojects = this.$store.state.userProfile.myprojects;
    }
  }
};
</script>

<style>
.myprofile {
  display: flex;
}
.myprofile_main{
  width: 80%
}
.myprofile_main-background {
  background-color: #f5f3f38f;
  padding: 10px;
}
.myprofile_main-name {
  margin-right: 10px;
  font-size: 2rem;
}
.myprofile_photo {
  margin-right: 20px;
}
.myprofile_photo span {
  font-weight: bold;
}
.myprofile_skill {
  margin-right: 10px;
  color: blue;
  background-color: rgb(210, 210, 210);
}
.myprofile_skills-font{
  font-size: 20px;
  font-weight: bold;
}

</style>