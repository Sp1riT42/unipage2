<template>
  <div id="app" class="app">
    <h1 class="app__heading">Тренажер слепой печати</h1>
<router-view :content="text" v-cloak></router-view>
  </div>
</template>

<script>
import TrainingComp from "@/components/trainingComp";
import style from '@/css/style.css'
export default {
  name: 'App',
  components: {
    TrainingComp
  },
  data() {
     return {
       text: '',
     }
  },
  methods: {
    getJson(url) {
      return fetch(url)
          .then(result => result.text())
          .catch(error => {
            //error
          })
    },
  },
  mounted() {
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>
