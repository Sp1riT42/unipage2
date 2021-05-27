<template>
  <div class="finish">
    <h2 class="finish__heading">Поздравялем!</h2>
    <div class="finish__info">
      <div class="finish__info-box">
        <p class="finish__text">Ваша скорость печати</p>
        <p class="finish__text"><span class="finish__text_result">{{getSpeedTraining()}}</span>зн./мин</p>
      </div>
      <div class="finish__info-box">
        <p class="finish__text">Ваша точность печати</p>
        <p class="finish__text "><span class="finish__text_result">{{getAccuracyKey()}}</span>%</p>
      </div>


    </div>
    <div class="finish__btn" v-on:click="restartGame()">Повторить попытку</div>
  </div>
</template>

<script>

export default {

  finishSpeed: null,
  finishAccuracyKey: null,
  name: "finishComp",
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
  }
}
</script>

<style scoped>

</style>