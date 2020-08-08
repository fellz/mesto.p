<template>
  <footer class="row profile__footer">
    <div class="col-4">
      <div class="list-group" id="list-tab" role="tablist">
        <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" href="#list-home" role="tab" aria-controls="home"
        >Мои проекты</a>
        <a class="list-group-item list-group-item-action" id="list-profile-list" data-toggle="list" href="#list-profile" role="tab" aria-controls="profile"
        >Мои заявки в проекты</a>
        <a class="list-group-item list-group-item-action" id="list-messages-list" data-toggle="list" href="#list-messages" role="tab" aria-controls="messages"
        >Участвую в проектах</a>
        <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-settings" role="tab" aria-controls="settings"
        >Навыки</a>
        <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-contacts" role="tab" aria-controls="settings"
        >Контакты</a>
        <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-teams" role="tab" aria-controls="settings"
        >Мои команды</a>
        <a class="list-group-item list-group-item-action" id="list-settings-list" data-toggle="list" href="#list-team-reqs" role="tab" aria-controls="settings"
        >Заявки в команды</a>
      </div>
    </div>
    <div class="col-8">
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="list-home" role="tabpanel" aria-labelledby="list-home-list">
          <h5>Мои проекты</h5>
          <hr />
          <div v-for="project of profile.myprojects" :key="project.id">
            <nuxt-link :to="'/projects/'+project.id">{{project.name}}</nuxt-link>
          </div>
        </div>
        <div class="tab-pane fade" id="list-profile" role="tabpanel" aria-labelledby="list-profile-list">
          <h5>Мои заявки в проекты</h5>
          <hr />
          <div v-for="req of profile.project_requests" :key="req.id">
            <span>{{req.name}}</span>
            <nuxt-link :to="'/projects/' + req.project">{{ req.project }}</nuxt-link>
          </div>
        </div>
        <div class="tab-pane fade" id="list-messages" role="tabpanel" aria-labelledby="list-messages-list">
          <h5>Участвую в проектах</h5>
          <hr />
          <div v-for="p of profile.projects" :key="p.id">
            <nuxt-link :to="'/projects/' + p.id">{{ p.name }}</nuxt-link>
          </div>
        </div>
        <div class="tab-pane fade" id="list-settings" role="tabpanel" aria-labelledby="list-settings-list"> 
          <span class="myprofile_skills-font">Навыки</span>
          <nuxt-link to="/my/auth/edit/skills">изменить</nuxt-link>
          <hr />
          <div v-for="skill of profile.skills" :key="skill.id">
            <span class="myprofile_skill">{{skill.skill}}</span>
          </div>
        </div>
        <div class="tab-pane fade" id="list-contacts" role="tabpanel" aria-labelledby="list-settings-list"> 
          <h5>Контакты</h5>
          <hr />
          <div v-for="contact of profile.contacts" :key="contact.id">
            <nuxt-link :to="'/profiles/' + contact.id">{{contact.fullname}}</nuxt-link>
          </div>
        </div>
        <div class="tab-pane fade" id="list-teams" role="tabpanel" aria-labelledby="list-settings-list"> 
          <h5>Мои команды</h5>
          <hr />
          <div v-for="t of profile.myteams" :key="t.id">
            <nuxt-link :to="'/teams/' + t.id">{{ t.name }}</nuxt-link>
          </div>
        </div>
        <div class="tab-pane fade" id="list-team-reqs" role="tabpanel" aria-labelledby="list-settings-list"> 
          <h5>Мои заявки в команды</h5>
          <hr />
          <div v-for="tr of profile.team_requests" :key="tr.id">
            <nuxt-link :to="'/teams/' + tr.id">{{tr.name}}</nuxt-link>
          </div>
        </div>

      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "ProfileFooter",
  props: {
    profile: Object
  },
}
</script>