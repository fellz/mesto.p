<template>
    <v-card style="margin-bottom: 20px" max-width="900">
        <v-row>
            <v-col xs=12 sm=8>
                <v-img
                    height="100"
                    src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                >
                </v-img>
                <v-card-text>
                    <h2 class="py-2">
                        <nuxt-link :to="'/projects/' + project.id">
                            {{ project.name }}
                        </nuxt-link>
                    </h2>
                    <v-clamp autoresize :max-lines="6">{{
                        project.description
                    }}</v-clamp>
                </v-card-text>
            </v-col>
            <v-col>
                <v-row justify="end" no-gutters class="mr-2">
                    <v-col
                        cols="6"
                        class="white--text"
                        style="background-color: gray; text-align: center"
                        >{{ project.stage }}</v-col
                    >
                    <v-col style="text-align: end">{{
                        project.created_at | formatDate
                    }}</v-col>
                </v-row>
                <v-card-title>Команда</v-card-title>
                <participants
                    :resource="project"
                    :owner_profile="project.owner"
                />

                <!-- vacancies -->
                <v-card-title>Вакансии</v-card-title>
                <span v-for="vac in project.vacancies" :key="vac.id">
                    <v-chip v-if="!vac.filled" class="mr-2 mb-2">
                        <join-project-button
                            :project="project"
                            :skill="vac"
                        />{{ vac.name }}
                    </v-chip>
                </span>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
import VClamp from 'vue-clamp';
import Participants from '~/components/common/participants.vue';
import JoinProjectButton from '~/components/projects/project/service/joinProjectButton.vue';

export default {
  name: 'ShortProject',
  props: {
    project: Object,
  },
  data() {
    return {
      profile: {},
      res: [],
      url: process.env.baseUrl,
      defAvatar: process.env.defAvatar,
    };
  },
  components: {
    VClamp,
    JoinProjectButton,
    Participants,
  },
  methods: {
    backimg(profile) {
      return `${profile.avatar ? '' : this.defAvatar}`;
    },
  },
};
</script>

<style>
.short_project {
    border-radius: 7px;
}
.aside__status {
    background-color: #f1eded;
}
</style>
