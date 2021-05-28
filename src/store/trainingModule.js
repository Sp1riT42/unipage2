export default {
    state: {
        speed: null,
        accuracyPercent: 100
    },
    mutations: {
        setSpeed(state, num) {
            state.speed = num
        },
        setAccuracyPercent(state, num) {
            state.accuracyPercent = num
        }
    }
}