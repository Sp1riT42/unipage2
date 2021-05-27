<template>
  <div id="app">
<router-view :content="text"></router-view>
<!--    <training-comp :content="text" ></training-comp>-->
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
       text: ''
     }
  },
  methods: {
    getJson(url) {
      return fetch(url)
          .then(result => result.text())
          .catch(error => {
            //this.$refs.error.setError(error);
          })
    }
  },
  mounted() {
    getJs: this.getJson('https://baconipsum.com/api/?type=meat-and-filler&paras=1&format=text')
        .then(data => {
          this.text = data
        });
  }
}
</script>

<style>
</style>
