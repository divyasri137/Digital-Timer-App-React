import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    buttonChange: false,
    minutes: 25,
    seconds: 0,
    newMinute: 25,
  }

  changeButton1 = () => {
    this.setState({buttonChange: true})
    this.timerId = setInterval(this.statusChange, 1000)
  }

  statusChange = () => {
    const {newMinute, seconds} = this.state
    if (newMinute === 0 && seconds === 0) {
      clearInterval(this.timerId)
    } else {
      const second = newMinute * 60 - 1 + seconds
      const m = Math.floor(second / 60)
      const s = second % 60
      this.setState({seconds: s, newMinute: m})
    }
  }

  changeButton2 = () => {
    this.setState({buttonChange: false})
    clearInterval(this.timerId)
  }

  decrement = () => {
    const {buttonChange, minutes} = this.state
    if (!buttonChange) {
      if (minutes > 1) {
        this.setState(prevState => ({
          minutes: prevState.minutes - 1,
          newMinute:
            prevState.seconds === 0
              ? prevState.newMinute - 1
              : prevState.newMinute,
        }))
      }
    }
  }

  increment = () => {
    const {buttonChange} = this.state
    if (!buttonChange) {
      this.setState(prevState => ({
        minutes: prevState.minutes + 1,
        newMinute:
          prevState.seconds === 0
            ? prevState.newMinute + 1
            : prevState.newMinute,
      }))
    }
  }

  timerReset = () => {
    clearInterval(this.timerId)
    this.setState({buttonChange: false, seconds: 0, newMinute: 25, minutes: 25})
  }

  render() {
    const {buttonChange, seconds, minutes} = this.state
    let {newMinute} = this.state
    if (!buttonChange && seconds === 0) {
      newMinute = minutes
    }
    const result =
      seconds > 9 ? `${newMinute}:${seconds}` : `${newMinute}:0${seconds}`
    const status = buttonChange ? 'Running' : 'Paused'
    return (
      <div className="main-container">
        <h1 className="main-heading">Digital Timer</h1>
        <div className="sub-container">
          <div className="round-div">
            <div className="content-div">
              <h1 className="color-text">{result}</h1>
              <p className="status">{status}</p>
            </div>
          </div>
          <div className="side-div">
            <div className="start-reset">
              {!buttonChange && (
                <div className="start">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.changeButton1}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                      className="icon"
                      alt="play icon"
                    />
                    Start
                  </button>
                </div>
              )}
              {buttonChange && (
                <div className="start">
                  <button
                    type="button"
                    className="btn"
                    onClick={this.changeButton2}
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
                      className="icon"
                      alt="pause icon"
                    />
                    Pause
                  </button>
                </div>
              )}

              <div className="start">
                <button type="button" className="btn" onClick={this.timerReset}>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="set-limit">Set Timer limit</p>
            <div className="limit-setter">
              <button
                type="button"
                className="set-button"
                onClick={this.decrement}
              >
                -
              </button>
              <p className="time-set">{minutes}</p>
              <button
                type="button"
                className="set-button"
                onClick={this.increment}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
// import {Component} from 'react'
// import './index.css'

// class DigitalTimer extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       image: false,
//       text: false,
//       setTimer: 25,
//       seconds: 0,
//       minute: 25,
//     }
//   }

//   componentDidMount() {
//     this.timeId = setInterval(this.tick, 1000)
//   }

//   componentWillUnmount() {
//     clearInterval(this.timeId)
//   }

//   //   tick = () => {
//   //     this.setState({setTimer})
//   //   }

//   reset = () => {
//     this.clearTimer()
//   }

//   onToggleImage = () => {
//     this.setState(prevState => {
//       const {image} = prevState
//       return {
//         image: !image,
//       }
//     })
//   }

//   decrease = () => {
//     this.setState(prevState => {
//       const {setTimer} = prevState
//       return {
//         setTimer: setTimer - 1,
//       }
//     })
//   }

//   increase = () => {
//     this.setState(prevState => {
//       const {setTimer} = prevState
//       return {
//         setTimer: setTimer + 1,
//       }
//     })
//   }

//   tick = () => {
//     this.timeId = setInterval(this.statusChange, 1000)
//   }

//   statusChange = () => {
//     const {minute, seconds} = this.state
//     if (minute === 0 && seconds === 0) {
//       clearInterval(this.timeId)
//     } else {
//       const second = minute * 60 - 1 + seconds
//       const m = Math.floor(second / 60)
//       const s = second % 60
//       this.setState({seconds: s, minute: m})
//     }
//   }
//   //   onToggleText = () => {
//   //     this.setState(prevState => {
//   //       const {text} = prevState
//   //       return {
//   //         text: !text,
//   //       }
//   //     })
//   //   }

//   render() {
//     const {text, image, setTimer, seconds, minute} = this.state
//     const result =
//       seconds > 9 ? `${minute}:${seconds}` : `${minute}:0${seconds}`
//     const status = text ? 'Running' : 'Paused'
//     return (
//       <div className="container">
//         <h1 className="heading">Digital Timer</h1>
//         <div className="container2">
//           <div className="image-container">
//             <div className="circle">
//               <h1 className="desc">{result}</h1>
//               <p className="desc1">{status}</p>
//             </div>
//           </div>
//           <div className="card">
//             <button onClick={this.onToggleImage} type="button" className="btn">
//               {image ? (
//                 <div className="icons">
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png"
//                     alt="pause icon"
//                     className="pause-icon"
//                   />
//                   <p className="play-text">Pause</p>
//                 </div>
//               ) : (
//                 <div className="icons">
//                   <img
//                     src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
//                     alt="play icon"
//                     className="play-icon"
//                   />
//                   <p className="play-text">Start</p>
//                 </div>
//               )}
//             </button>
//             {(image, text && <DigitalTimer />)}
//             <button type="button" className="btn">
//               <div className="icons">
//                 <img
//                   src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
//                   alt="reset icon"
//                   className="reset-icon"
//                   onClick={this.reset}
//                 />
//                 <p className="play-text">Reset</p>
//               </div>
//             </button>
//             <div className="card2">
//               <p className="heading2">Set Timer limit</p>
//               <div className="buttons">
//                 <button
//                   className="symbol"
//                   onClick={this.decrease}
//                   type="button"
//                 >
//                   -
//                 </button>
//                 <p className="btn-num">{setTimer}</p>
//                 <button
//                   className="symbol"
//                   onClick={this.increase}
//                   type="button"
//                 >
//                   +
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
// export default DigitalTimer
