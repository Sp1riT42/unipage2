<template>
  <div class="finish">
    <h2 class="finish__heading">Поздравялем!</h2>
    <div class="finish__info">
      <div class="finish__info-box">
        <p class="finish__text">Ваша скорость печати</p>
        <p class="finish__text"><span class="finish__text_result">{{finishSpeed}}</span>зн./мин</p>
      </div>
      <div class="finish__info-box">
        <p class="finish__text">Ваша точность печати</p>
        <p class="finish__text "><span class="finish__text_result" >{{finishAccuracyKey}}</span>%</p>
      </div>
    </div>
    <div class="finish__btn" v-on:click="restartGame()">Повторить попытку</div>
  </div>
</template>

<script>

export default {

  name: "finishComp",
  data() {
    return {
      finishSpeed: null,
      finishAccuracyKey: null
    }
  },
  methods: {
    getSpeedTraining() {
      return this.$store.state.trainingModule.speed
    },
    getAccuracyKey() {
      return this.$store.state.trainingModule.accuracyPercent
    },
  restartGame() {
    this.$router.push('/')
  }
  },
  mounted() {
    this.finishSpeed = this.getSpeedTraining()
    this.finishAccuracyKey = this.getAccuracyKey()
    if(this.finishSpeed === null) {
      this.restartGame()
    }
  }
}
</script>

<style scoped>
</style>