const NB_SECONDS = 60
let timerInterval = null

function blink(el, className) {
    document.querySelector(el).classList.toggle(className)
    setTimeout(() => document.querySelector(el).classList.toggle(className), 500)

}

const vue = new Vue({
    el: '#app',
    mounted() {
        this.randomMultilication()
        this.resetTimer()
    },
    filters: {
        formatTime(time) {
            const minutes = Math.floor(time / 60)
            let seconds = time % 60
            if (seconds < 10) { seconds = `0${seconds}` }
            return `${minutes}:${seconds}`
        }
    },
    computed: {
        isTimerActive() {
            return this.timeLeft !== NB_SECONDS && this.timeLeft !== 0
        }
    },
    data() {
        return {
            x: 0,
            y: 0,
            answer: '...',
            timeLeft: 0,
            timePassed: 0,
            nbRep: 0,
            nbErr: 0
        }
    },
    methods: {
        randomMultilication() {
            this.x = Random.randint(2, 20)
            this.y = Random.randint(2, 20)
        },
        checkResult() {
            if (!this.isTimerActive) {
                if (this.timePassed === 0) this.startTimer()
                else {
                    blink('.time', 'error')
                    return
                }
            }
            if (this.answer === '...') return
            if (parseInt(this.answer) == this.x * this.y) {
                blink('#app input', 'true')
                this.nbRep++
                this.randomMultilication()
                this.answer = ''
            } else {
                blink('#app input', 'false')
                this.nbErr++
                this.answer = ''
            }
        },
        reset() {
            this.resetTimer()
            this.randomMultilication()
            this.nbRep = 0
            this.nbErr = 0
            this.answer = ''
        },
        resetTimer() {
            this.timeLeft = NB_SECONDS
            this.timePassed = 0
        },
        startTimer() {
            timerInterval = setInterval(() => {
                this.timePassed = this.timePassed += 1
                this.timeLeft = NB_SECONDS - this.timePassed
                if (this.timeLeft <= 0) {
                    clearInterval(timerInterval)
                }
            }, 1000)
        }
    }
})