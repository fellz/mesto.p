  <template>
  <div>
    <section>
      <h5>Профиль</h5>
      <hr />
      <form @submit.prevent="checkForm" method="post">
        <p>
          <label>Имя</label>
          <input type="text" v-model="profile.fullname" class="form-control" placeholder="Имя" />
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
      edit_ok: false,
      baseUrl: process.env.baseUrl
    };
  },
  created() {
    this.getProfile();
  },
  methods: {
    async getProfile(){
      const { data } = await axios.get(`${this.baseUrl}/profiles/${this.$store.state.userProfile.id}`);
      this.profile = data;
    },
    async checkForm() {
      const profile = {
        fullname: this.profile.fullname,
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
        `${this.baseUrl}/profiles/${this.$store.state.userProfile.id}`,
        profile,
        options
      );
      
      this.$router.replace('/my');
    }
  }
};
</script>