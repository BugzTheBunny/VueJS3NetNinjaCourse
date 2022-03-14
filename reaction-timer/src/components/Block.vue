<template>
  <div class="block" v-if="showBlock" @click="stopTimer">
    Click Me
    <p v-if="score">Reaction : {{ score }}ms</p>
  </div>
</template>

<script>
export default {
  props: ["delay", "score"],
  data() {
    return {
      showBlock: false,
      timer: null,
      reactionTime: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.showBlock = true;
      this.startTimer();
    }, this.delay);
  },
  methods: {
    startTimer() {
      this.timer = setInterval(() => {
        this.reactionTime += 10;
      }, 10);
    },
    stopTimer() {
      clearInterval(this.timer);
      this.$emit("stopGame", this.reactionTime);
    },
  },
};
</script>

<style>
.block {
  width: 400px;
  border-radius: 25px;
  background: rgb(0, 187, 0);
  color: white;
  text-align: center;
  padding: 100px 0;
  margin: 40px auto;
  font-size: 2rem;
}
</style>