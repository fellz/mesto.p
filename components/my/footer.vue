<template>
  <div>
    <v-card>
      <v-tabs vertical background-color="cyan" dark>
        <v-tab>Проекты</v-tab>
        <v-tab>Команды</v-tab>
        <v-tab>Навыки</v-tab>
        <v-tab>Контакты</v-tab>

        <!-- Projects -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-tabs>
                <v-tab>Мои проекты</v-tab>
                <v-tab>Заявки в проекты</v-tab>
                <v-tab>Участвую в проектах</v-tab>

                <v-tab-item>
                  <div v-if="profile.myprojects && profile.myprojects.length > 0">
                    <div v-for="project of profile.myprojects" :key="project.id">
                      <nuxt-link :to="'/projects/'+project.id">{{project.name}}</nuxt-link>
                    </div>
                  </div>
                  <div v-else>Пока нет проектов</div>
                </v-tab-item>

                <v-tab-item>
                  <div v-if="profile.project_requests && profile.project_requests.length > 0">
                    <div v-for="req of profile.project_requests" :key="req.id">
                      <span>{{req.name}}</span>
                      <nuxt-link :to="'/projects/' + req.project">{{ req.project }}</nuxt-link>
                    </div>
                  </div>
                  <div v-else>Пока нет заявок</div>
                </v-tab-item>

                <v-tab-item>
                  <div v-if="profile.projects && profile.projects.length > 0">
                    <div v-for="p of profile.projects" :key="p.id">
                      <nuxt-link :to="'/projects/' + p.id">{{ p.name }}</nuxt-link>
                    </div>
                  </div>
                  <div v-else>Пока нигде не участвую</div>
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Teams -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-tabs>
                <v-tab>Мои команды</v-tab>
                <v-tab>Заявки в команды</v-tab>

                <v-tab-item>
                  <div v-if="profile.teams && profile.teams.length > 0">
                    <div v-for="t of profile.myteams" :key="t.id">
                      <nuxt-link :to="'/teams/' + t.id">{{ t.name }}</nuxt-link>
                    </div>
                  </div>
                  <div v-else>Пока нет команд</div>
                </v-tab-item>

                <v-tab-item>
                  <div v-if="profile.team_requests && profile.team_requests.length > 0">
                    <div v-for="tr of profile.team_requests" :key="tr.id">
                      <nuxt-link :to="'/teams/' + tr.id">{{tr.name}}</nuxt-link>
                    </div>
                  </div>
                  <div v-else>Пока никуда не подавал заявки</div>
                </v-tab-item>
              </v-tabs>
            </v-card-text>
          </v-card>
        </v-tab-item>
        <!-- Skills -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <v-row>
                <v-col>
                  <div v-for="skill of profile.skills" :key="skill.id">
                    <v-chip class="ma-2">{{skill.skill}}</v-chip>
                  </div>
                </v-col>

                <v-col>
                  <v-select
                    v-model="selected"
                    :items="skills"
                    @change="addSkill"
                    label="Выберите навык"
                  ></v-select>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-tab-item>

        <!-- Contacts -->
        <v-tab-item>
          <v-card flat>
            <v-card-text>
              <div v-if="profile.contacts && profile.contacts.length > 0">
                <div v-for="contact of profile.contacts" :key="contact.id">
                  <nuxt-link :to="'/profiles/' + contact.id">{{contact.fullname}}</nuxt-link>
                </div>
              </div>
              <div v-else>Пока никого нет</div>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "ProfileFooter",
  props: {
    profile: Object,
  },
  data() {
    return {
      selected: "",
      skills: [],
    };
  },
  async created() {
    const resp = await this.$axios.$get(`/skills`);
    this.skills = resp.map((r) => r.skill);
  },
  methods: {
    addSkill() {
      console.log(this.selected);
    },
  },
};
</script>