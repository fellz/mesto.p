<template>
  <div>
    <project-edit />
  </div>
</template>

<script>
import ProjectEdit from "~/components/projects/project/edit/index.vue";

export default {
  components: {
    ProjectEdit
  },
  middleware: ["auth"]
}
</script>
