<template>
    <v-dialog v-model="pdialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      
      <v-card>
        <v-container>
          <v-row justify="center">
            <v-col md="8" class="profile-dialog">
              <v-card-title class="headline grey lighten-2">
                {{ profile.fullname }}
              </v-card-title>
              <v-card-subtitle class="grey lighten-2">
                {{ profile.city }}
              </v-card-subtitle>

              <v-avatar class="profile-dialog-avatar" size="130">
                <v-img :src="avatar"></v-img>
              </v-avatar>

              <v-card-text>
                {{ profile.about }}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-chip class="ma-2" v-for="s in profile.skills" :key="s.id">
                  {{s.skill}}
                </v-chip>
                <v-btn color="primary" text nuxt :to="'/profiles/' + profile.id" >
                  Профиль
                </v-btn>
                <v-btn color="primary" text @click="closeDialog" >
                  Закрыть
                </v-btn>
              </v-card-actions>
             </v-col>
           </v-row>
        </v-container>
      </v-card>
          
    </v-dialog>
</template>

<script>
export default {
  name: "ProfileDialog",
  props: {
    profile: Object,
    dialog: Boolean
  },
  data(){
    return {
      pdialog: this.dialog,
      devUrl: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
      aprofile: this.profile
    }
  },
  computed:{
    avatar(){
      return `${this.devUrl}${
        this.profile.avatar.length
          ? this.profile.avatar[0].formats.thumbnail.url
          : this.defAvatar
      }`;
    }
  },
  methods:{
    closeDialog(){
      this.pdialog = false
      this.$emit('close')
    },
    goProfile(id){
      this.pdialog = false
      this.$router.replace(`/profiles/${id}`)
    }
  },
  watch: {
    dialog: function(newVal){
      this.pdialog = newVal;
    }
  }
}
</script>

<style>
  .profile-dialog{
    position: relative;
    background-color: #f0f0f0;;
    padding-top: 100px;
  }
  .profile-dialog-avatar{
    position: absolute;
    right: 20px;
    top: 30px;    
  }
</style>