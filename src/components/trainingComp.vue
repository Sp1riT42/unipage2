<template>
  <div class="words" v-cloak>
    <p class="words__content">
<!--      <span :class="{active: false}" v-if="start !== index" v-for="(item,index) in content" :key="index">{{item}}</span>-->
<!--      <span :class="{goodKey: true}" v-else-if="index > index-1" v-for="(item,index) in content" :key="index">{{item}}</span>-->
<!--      <span :class="{active: true, err: isError}" v-else>{{item}}</span>-->
      <span :class="{active: true, err: isError}" v-if="start === index" v-for="(item,index) in content" :key="index">{{item}}</span>
      <span :class="{goodKey: true}" v-else-if="index < start">{{item}}</span>
      <span :class="{active: false}" v-else>{{item}}</span>
<!--      <span :class="{active: true, err: isError}" v-else>{{item}}</span>-->

    </p>
    <div class="words__char">
      <div>
        <div class="words__speed">
          <p class="words__text">Скорость</p>
          <p class="words__text">
            <span class="words__text_main">{{iSpeed}}</span> зн./мин
          </p>
        </div>
        <div class="words__good">
          <p class="words__text">точность</p>
          <p class="words__text">
            <span class="words__text_main">{{accuracyPercent}}</span> %
          </p>
        </div>
      </div>
      <div class="words__text words__btn" v-on:click="restartTrain">Заново</div>
    </div>
  <div class="popup" v-show="startTraining">
    <p class="popup__text">
      Приготовьтесь печатать. Поехали!
    </p>
    <div class="popup__btn" v-on:click="startGame">Начать печатать</div>
  </div>
    <div class="overlay" v-show="startTraining"></div>
  </div>
</template>

<script>

export default {
  name: "trainingComp",
  props: ['content'],
  data() {
    return {
      reg: new RegExp("\\D",""),
      start: 0,
      end: null,
      isError: false,
      iSpeed: 0,
      iTime: 0,
      goodPress: 0,
      accuracyPercent: 100,
      badPress: 0,
      startTraining: true,
      startCheckSpeed: null
    }
  },
  methods: {
    pressKey(event) {
      if(this.reg.test(event.key) && event.key.length === 1) {
        console.log(event.key)
        console.log(this.start, this.end)
        this.availableWord(event.key)
      }
    },
    availableWord(word) {
      console.log( this.startCheckSpeed)
      if(word === this.content[this.start]) {
        console.log('угадал')
        this.isError = false
        this.start++
        if(this.goodPress === 0) {
          this.startCheckSpeed = setInterval(this.checkSpeed, 1000)
        }
        this.goodPress++
        if(this.goodPress === this.end) {
          this.setParamsTraining()
          document.removeEventListener('keydown', this.pressKey);
          //this.finishTraining()
          this.$router.push('finish')
        }
      } else {
        if(!this.isError) {
          this.isError = true
          this.badPress++
          this.accuracyKey()
        }
        console.log('не угадал')
      }
    },
    setParamsTraining(){
      this.$store.state.trainingModule.speed = this.iSpeed
      this.$store.state.trainingModule.accuracyPercent = this.accuracyPercent
    },
    checkSpeed() {
      let lastTime
      if(this.iTime === 0) {
        this.iTime = new Date().getTime()
        this.iSpeed = this.goodPress / 1 * 60
      }
      else {
        lastTime = new Date().getTime()
        this.iSpeed = Math.round(this.goodPress / (lastTime - this.iTime ) * 60000)
      }
    },
    restartTrain() {
      this.start = 0
      this.end = null
      this.isError = false
      this.iTime = 0
      this.goodPress = 0
      this.accuracyPercent = 100
      this.badPress = 0
      this.startTraining = true
      clearInterval(this.startCheckSpeed)
      this.$parent.getJson('https://baconipsum.com/api/?type=meat-and-filler&sentences=1&paras=1&format=text').then(data => {
         this.$parent.text = data
       });
    },
    accuracyKey() {
      return  this.accuracyPercent = Math.round(((this.accuracyPercent - this.badPress / this.end * 100)*100))/100
    },
    // finishTraining() {
    //   console.log('игра окончена')
    // },
    startGame(){
      this.startTraining = !this.startTraining
      document.addEventListener('keydown', this.pressKey);
    }
    },
  computed: {
  },
  created() {
    this.restartTrain()
  },
  beforeUpdate() {
    this.end = this.content?.length
  }
}
</script>

<style>
[v-cloak] {
  display: none;
}
</style>