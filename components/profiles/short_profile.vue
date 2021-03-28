<template>
  <div>
    <v-card min-width="300" max-width="344" elevation="6">
      <v-container>
        <div style="text-align:right" v-if="profile.social">
          <v-icon>mdi-thumb-up</v-icon><v-chip>{{ social }}</v-chip>
        </div>
        <v-row>
          <v-col class="text-center">
            <v-avatar color="indigo" size="130">
              <v-img :src="profilePhotoUrl" />
            </v-avatar>
          </v-col>
        </v-row>

        <v-row justify="center">
          <v-btn color="primary" dark @click.stop="dialog=true">{{ profile.fullname }}</v-btn>
        </v-row>

        <v-row justify="center">
          <span class="font-italic text-subtitle-2 text--secondary">{{ profile.city }}</span>
        </v-row>

        <v-row justify="center">
          <a :href="profile.url" class="text-subtitle-2" target="_blank">{{ profile.url }}</a>
        </v-row>

        <v-row justify="center">
          <v-col>
            <div class="text--secondary">
              <v-clamp autoresize :max-lines="4">{{ profile.about }}</v-clamp>
            </div>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-chip class="ma-2" v-for="s in profile.skills" :key="s.id">{{s.skill}}</v-chip>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions class="justify-center">
        <social-buttons :profileId="profile.id" :profile="profile" />
      </v-card-actions>
    </v-card>

    <profile-dialog :profile="profile" :dialog="dialog" @close="dialog=false" />
  </div>
</template>

<script>
import VClamp from "vue-clamp";
import ProfileDialog from "~/components/profiles/profile_dialog.vue";
import SocialButtons from "~/components/profiles/social.vue"

export default {
  props: {
    mprofile: Object,
  },
  data() {
    return {
      dialog: false,
      social: 0,
      profile: this.mprofile,
      devUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
    };
  },
  computed: {
    hasSkills() {
      return this.profile.skills.length > 0;
    },
    profilePhotoUrl() {
       if (process.env.NODE_ENV === "development"){
        return `${this.devUrl}${ this.profile.avatar.length 
            ? this.profile.avatar[0].formats.thumbnail.url 
            : this.defAvatar}`
      }else{
        return `${ this.profile.avatar.length
            ? this.profile.avatar[0].formats.thumbnail.url
            : this.defAvatar}`
      }
    },
  },
  components: {
    VClamp,
    ProfileDialog,
    SocialButtons
  },
  created(){
    this.getSocial()
  },
  methods: {
    async getSocial(){
      this.social = await this.$axios.$get(`/socials/count?profile_whom=${this.profile.id}`)
    },
  }
};
</script>