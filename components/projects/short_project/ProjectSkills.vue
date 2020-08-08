<template>
  <div class="row">
    <div class="col-sm-5">
      <div class="list-group" id="list-tab" role="tablist">
        <a class="list-group-item list-group-item-action active" id="list-home-list" data-toggle="list" :href="'#list-home'+project.id" role="tab" aria-controls="home"
        >Кто нужен</a>
        <a class="list-group-item list-group-item-action" id="list-teams-list" data-toggle="list" :href="'#list-teams'+project.id" role="tab" aria-controls="home"
        >Участники</a>
        <a class="list-group-item list-group-item-action" id="list-skills-list" data-toggle="list" :href="'#list-skills'+project.id" role="tab" aria-controls="home"
        >Команды</a>
      </div>
    </div>
    <div class="col-sm-7">
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" :id="'list-home'+project.id" role="tabpanel" aria-labelledby="list-home-list">
          <div v-for="skill of project.project_skills" :key="skill.id">
            <div v-if="skill.filled !== true">
              <span>{{ skill.name }} <span class="project_skills--pay">({{skill.pay ? "платим" : "волонтер"}})</span></span>
            </div>
          </div>
          <div><nuxt-link :to="'/projects/' + project.id">Оставить заявку</nuxt-link></div>
        </div>
        <div class="tab-pane fade" :id="'list-teams'+project.id" role="tabpanel" aria-labelledby="list-teams">
          <div>
            <b><nuxt-link :to="'/profiles/' + project.owner.id">{{project.owner.fullname}}</nuxt-link></b>
          </div>
          <div v-for="participant of project.participants" :key="participant.id" >
            <nuxt-link :to="'/profiles/' + participant.id">{{participant.fullname}}</nuxt-link>
          </div>
        </div>
        <div class="tab-pane fade" :id="'list-skills'+project.id" role="tabpanel" aria-labelledby="list-skills">
          <div v-for="team of project.teams" :key="team.id" class="profiles">
            <nuxt-link :to="'/teams/' + team.id">{{ team.name }}</nuxt-link>
          </div>
          <div><nuxt-link :to="'/projects/' + project.id">Оставить заявку</nuxt-link></div>
        </div>
      </div>
    </div>
  </div><!-- row -->  
</template>

<script>

export default {
  props: {
    project: Object
  },
}
</script>

<style>
.project_skills--pay{
  font-weight: bold;
}
</style>