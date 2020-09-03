<template>
  <div>
    <v-card class="mb-4">
      <v-row>
        <!-- Avatar City Url-->
        <v-col cols="12" sm="4" align="center" style="position:relative">
          <v-btn absolute right light icon nuxt to="/my/auth/edit/photo">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-avatar size="150">
            <img :src=" url + avatar" />
          </v-avatar>
          <v-list>
            <v-list-item class="justify-center">
              {{profile.city}}
            </v-list-item>
            <v-list-item class="justify-center">
              <a
                :href="profile.url == 0 ? '' : profile.url"
                target="_blank"
              >{{profile.url == 0 ? '' : profile.url}}</a>
            </v-list-item>
          </v-list>
        </v-col>
        <!-- About block -->
        <v-col cols="12" sm="8">
          <v-card-title>
            {{profile.fullname}}
            <v-btn light icon nuxt to="/my/auth/edit/">
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text>{{profile.about}}</v-card-text>
        </v-col>
      </v-row>
    </v-card>
    <!-- Footer -->
    <profile-footer :profile="profile" @update-profile="getProfile" />
  </div>
</template>

<script>
import ProfileFooter from "~/components/my/footer";

export default {
  name: "MyProfile",
  components: {
    ProfileFooter,
  },
  data() {
    return {
      profile: {},
      userError: "",
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
    };
  },
  async created() {
    await this.getProfile();
  },
  computed: {
    avatar() {
      return this.profile.avatar
        ? this.profile.avatar.formats.thumbnail.url
        : this.defAvatar;
    },
  },
  methods: {
    async getProfile() {
      this.profile = await this.$axios.$get(
        `/profiles/${this.$store.state.userProfile.id}`
      );
    },
  },
};
</script>

<style>
.myprofile__aside {
  padding-right: 20px;
}
.main__title {
  display: flex;
  justify-content: space-between;
}
.profile__footer {
  margin-top: 20px;
}
</style>

