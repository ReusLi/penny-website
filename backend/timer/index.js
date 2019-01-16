const DocTimer = require('./documentTimer')

class Timer {
    runAllTimer() {
        DocTimer.run()
    }
}

module.exports = new Timer()