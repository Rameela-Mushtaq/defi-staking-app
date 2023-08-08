import React, {Component} from 'react'

class Airdrop extends Component {
    // Airdrop to have a timer that counts down
    // initilaze the countdown after our customer have staked a certain amount.... 50
    // timer functionaity, countdown, stake - for time to work..

    constructor() {
        super()
        this.state = {time: {}, seconds: 20};
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
    }

    startTimer() {
        if(this.timer == 0 && this.state.seconds > 0) {
            this.timer = setInterval(this.countDown, 1000)
        }
    }

    countDown() {
        // coundown one seconds at a time
        let seconds = this.state.seconds -1

        this.setState({
            time: this.secondstoTime(seconds),
            seconds: seconds
        })
        // stop counting when we hit zero
        if(seconds == 0) {
            clearInterval(this.timer)
        }
    }

    secondstoTime(secs) {
        let hours, minutes, seconds
        hours = Math.floor(secs / (60 * 60))

        let devisor_for_minutes = secs % (60 * 60)
        minutes = Math.floor(devisor_for_minutes / 60)

        let devisor_for_seconds = devisor_for_minutes % 60 
        seconds = Math.ceil(devisor_for_seconds)

        let obj = {
            'h':hours,
            'm':minutes,
            's': seconds
        }
        return obj
    }

    airdropReleaseTokens() {
        let stakingB = this.props.stakingBalance
        if(stakingB >= '5000000000000000000') {
            this.startTimer()
        }
    }

    componentDidMount() {
        let timeleftVar = this.secondstoTime(this.state.seconds)
        this.setState({time: timeleftVar})
    }

    render() {
        this.airdropReleaseTokens()
        return(
            <div style={{color: 'black'}}>
                {this.state.time.m}:{this.state.time.s}
                {this.startTimer()}
            </div>
        )
    }
}

export default Airdrop;