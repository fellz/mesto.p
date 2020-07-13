<template>
  <div>
    <div class="profile_edit_wrapper">
      <section class="profile_edit_main">
        <h5>Профиль</h5>
        <hr />
        <form @submit.prevent="checkForm" method="post">
          <p>
            <label>Имя</label>
            <input type="text" v-model="profile.fullname" class="form-control" placeholder="Имя" />
          </p>
          <p>
            <label>Опыт</label>
            <textarea
              class="form-control"
              v-model="profile.experience"
              placeholder="Опыт"
              aria-label="With textarea"
            ></textarea>
          </p>
          <p>
            <label>О себе</label>
            <textarea
              class="form-control"
              v-model="profile.about"
              placeholder="О себе"
              aria-label="With textarea"
            ></textarea>
          </p>
          <p>
            <label>Страна</label>
            <input
              type="text"
              class="form-control"
              v-model="profile.country"
              placeholder="Откуда вы"
            />
          </p>
          <p>
            <label>Город</label>
            <input
              type="text"
              class="form-control"
              v-model="profile.city"
              placeholder="Откуда вы"
            />
          </p>
          <p>
            <label>Возраст</label>
            <input
              type="number"
              class="form-control"
              v-model="profile.age"
              placeholder="Возраст"
            />
          </p>
          <input type="submit" class="btn btn-primary" value="Изменить" />
        </form>
        <h5 v-if="edit_ok">Успешно</h5>
      </section>
      <section class="profile_edit_photo">
        <p>
          <img :src="'http://localhost:1337' + profile.avatar" />
        </p>
        <p>
          <label>Изменить фото</label>
          <input
            type="file"
            ref="image"
            accept="image/*"
            class="form-control"
            @change="imageSelected"
          />
        </p>
      </section>
      <section class="profile_edit_skills">
        <h5>Навыки:</h5>
         <select v-model="selected" class="custom-select" style="height:100%; margin-left:10px;" multiple>
          <option disabled value>Выберите несколько вариантов</option>
          <option v-for="skill of skills" :key="skill.id" :value="skill.id">
              {{skill.skill}}
          </option>
        </select>
        <br>
        <input type="submit" class="btn btn-primary profile_edit-button_margin" @click="skillChoosen" value="Изменить" />
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// Example
export default {
  data() {
    return {
      profile: {
        fullname: "",
        experience: "",
        about: "",
        prof_id: "",
        avatar: "",
        city: "",
        country: "",
        age: 0
      },
      edit_ok:false,
      skills: [],
      selected: []
    };
  },
  middleware: "auth",
  methods: {
    async checkForm() {
      const profile = {
        fullname: this.profile.fullname,
        experience: this.profile.experience,
        about: this.profile.about,
        city: this.profile.city,
        country: this.profile.country,
        age: this.profile.age
      };
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await axios.put(
        `http://localhost:1337/profiles/${this.$store.state.authUser.user.profile.id}`,
        profile,
        options
      );
      // ok edit message
      this.edit_ok = true
      setTimeout(() => {
        this.edit_ok = false
      }, 2000);
      /// end
      this.$store.dispatch("getProfile"); // update profile
    },
    async imageSelected() {
      const options = {
        headers: {
          Authorization: `Bearer ${this.$store.state.authUser.jwt}`,
          "Content-Type": "multipart/form-data"
        }
      };
      this.avatar = this.$refs.image.files[0];
      const file_name = this.$refs.image.files[0].name;
      const prof_id = this.$store.state.userProfile.id;
      let formData = new FormData();
      formData.append("files", this.avatar, file_name);
      formData.append("ref", "profiles");
      formData.append("refId", prof_id);
      formData.append("field", "avatar");
      const resp = await axios.post(
        `http://localhost:1337/upload`,
        formData,
        options
      );
      this.$store.dispatch("getProfile");
    },
    async skillChoosen(){
      const skills = this.selected
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` },
      };
      const resp = await axios.put(
        `http://localhost:1337/profiles/${this.$store.state.userProfile.id}`,
        {skills},
        options
      );
       this.$router.replace({ path: '/my'})
    }
  },
  watch: {
    "$store.state.userProfile": function() {
      const profile = this.$store.state.userProfile;
      this.profile = {
        fullname: profile.fullname,
        about: profile.about,
        experience: profile.experience,
        city: profile.city,
        country: profile.country,
        age: profile.age,
        avatar: profile.avatar ? profile.avatar.formats.thumbnail.url : "/uploads/thumbnail_profile_default_985f0608e3.jpeg",
        skills: this.$store.state.userProfile.skills
      };
    }
  },
  async fetch() {
    this.$store.dispatch("getProfile");
    const { data } = await axios.get('http://localhost:1337/skills')
    this.skills = data
  }
};
</script>

<style >
.profile_edit_wrapper {
  display: flex;
}
.profile_edit_photo {
  margin-top: 10px;
}
.profile_edit_main {
  width: 30%;
  margin-right: 20px;
}
.profile_edit_skills{
  width: 30%
}
.profile_edit-button_margin{
  margin-top: 10px;
}
</style>>
