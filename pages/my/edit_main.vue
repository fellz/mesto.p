  <template>
  <div>
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
          <input type="text" class="form-control" v-model="profile.country" placeholder="Откуда вы" />
        </p>
        <p>
          <label>Город</label>
          <input type="text" class="form-control" v-model="profile.city" placeholder="Откуда вы" />
        </p>
        <p>
          <label>Ссылка</label>
          <input type="text" class="form-control" v-model="profile.url" placeholder="Ваш сайт или ссылка на соц. сети" />
        </p>
        <p>
          <label>Возраст</label>
          <input type="number" class="form-control" v-model="profile.age" placeholder="Возраст" />
        </p>
        <input type="submit" class="btn btn-primary" value="Изменить" />
      </form>
      <h5 v-if="edit_ok">Успешно</h5>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      profile: {},
      edit_ok: false
    };
  },
  middleware: "auth",
  async created() {
    const { data } = await axios.get(
      `${process.env.baseUrl}/profiles/${this.$store.state.userProfile.id}`
    );
    this.profile = {
      fullname: data.fullname,
      about: data.about,
      experience: data.experience,
      country: data.country,
      city: data.city,
      age: data.age,
      url: data.url
    };
  },
  methods: {
    async checkForm() {
      const profile = {
        fullname: this.profile.fullname,
        experience: this.profile.experience,
        about: this.profile.about,
        city: this.profile.city,
        country: this.profile.country,
        age: this.profile.age ? this.profile.age : 0 ,
        url: this.profile.url
      };
      const options = {
        headers: { Authorization: `Bearer ${this.$store.state.authUser.jwt}` }
      };
      const resp = await axios.put(
        `${process.env.baseUrl}/profiles/${this.$store.state.userProfile.id}`,
        profile,
        options
      );
      // ok edit message
      // this.edit_ok = true;
      // setTimeout(() => {
      //   this.edit_ok = false;
      // }, 2000);
      /// end
      this.$router.replace('/my');
      //this.$store.dispatch("getProfile"); // update profile
    }
  }
};
</script>

<style>
.profile_edit_main {
  width: 80%;
}
</style>