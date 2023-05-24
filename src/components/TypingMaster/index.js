// Write your code here.
import {Component} from 'react'

import './index.css'

const difficultyLevelText = {
  INITIAL: '',
  BEGINNER:
    'asdf jkl; fdsa l;kj jkl; gh fdsa hjkl fdsa asdf gh jkl; l;kj hjkl asdf fdsa l;kj gh jkl;',
  INTERMEDIATE:
    'The quick brown fox jumps over the lazy dog. She sells seashells by the seashore. Peter Piper picked a peck of pickled peppers. How much wood would a woodchuck chuck if a woodchuck could chuck wood?',
  EXPERT:
    'The seething sea ceaseth and thus the seething sea sufficeth us. Amidst the mists and coldest frosts, with barest wrists and stoutest boasts, he thrusts his fists against the posts and still insists he sees the ghosts.',
}

const difficultyLevelsList = [
  {
    value: 'BEGINNER',
    displayText: 'BEGINNER',
  },
  {
    value: 'INTERMEDIATE',
    displayText: 'Intermediate',
  },
  {
    value: 'EXPERT',
    displayText: 'Expert',
  },
]

class TypingMaster extends Component {
  state = {
    selectedDifficultyLevel: difficultyLevelsList[0].value,
    userInputText: '',
    challengeText: difficultyLevelText.INITIAL,
    userAccuracy: '',
    wordsPerMinute: '',
    startTime: null,
    timerInterval: null,
    timer: 0,
  }

  onChangeDifficultyLevel = event => {
    this.setState({
      selectedDifficultyLevel: event.target.value,
    })
  }

  onChangeUserInput = event => {
    this.setState({userInputText: event.target.value})
  }

  displayChallengeText = () => {
    const {selectedDifficultyLevel} = this.state

    switch (selectedDifficultyLevel) {
      case 'BEGINNER':
        return this.setState({challengeText: difficultyLevelText.BEGINNER})
      case 'INTERMEDIATE':
        return this.setState({challengeText: difficultyLevelText.INTERMEDIATE})
      case 'EXPERT':
        return this.setState({challengeText: difficultyLevelText.EXPERT})
      default:
        return this.setState({challengeText: difficultyLevelText.INITIAL})
    }
  }

  onClickStart = () => {
    this.displayChallengeText()
    const timerStart = new Date()
    this.setState({
      startTime: timerStart,
      timerInterval: setInterval(this.updateTimer, 1000),
    })
  }

  updateTimer = () => {
    this.setState(prevState => ({
      timer: prevState.timer + 1,
    }))
  }

  calculateAccuracy = () => {
    const {challengeText, userInputText} = this.state
    const challengeTextLength = challengeText.length
    const userInputTextLength = userInputText.length

    const minLength = Math.min(challengeTextLength, userInputTextLength)

    let correctlyTyped = 0
    for (let i = 0; i < minLength; i += 1) {
      if (challengeText[i] === userInputText[i]) {
        correctlyTyped += 1
      }
    }

    const accuracy = (correctlyTyped / challengeTextLength) * 100
    const formattedAccuracy = accuracy.toFixed(2)

    this.setState({
      userAccuracy: formattedAccuracy,
    })
  }

  countWordsPerMinute = () => {
    const {userInputText, timer} = this.state
    const words = userInputText.trim().split(/\s+/)
    const wordCount = words.length
    const wpm = Math.round((wordCount / timer) * 60)

    this.setState({
      wordsPerMinute: wpm,
    })
  }

  calculateTimeDifference = () => {
    const {startTime} = this.state
    const endTime = new Date()
    const timeDiffInSeconds = Math.floor((endTime - startTime) / 1000)
    this.setState({
      timer: timeDiffInSeconds,
    })
  }

  onClickSubmit = () => {
    const {timerInterval} = this.state
    this.calculateAccuracy()
    this.countWordsPerMinute()
    this.calculateTimeDifference()
    clearInterval(timerInterval)
  }

  onClickReset = () => {
    this.setState({
      selectedDifficultyLevel: difficultyLevelsList[0].value,
      userInputText: '',
      challengeText: difficultyLevelText.INITIAL,
      userAccuracy: '',
      wordsPerMinute: '',
      startTime: null,
      timerInterval: null,
      timer: 0,
    })
  }

  render() {
    const {
      challengeText,
      userInputText,
      userAccuracy,
      wordsPerMinute,
    } = this.state

    return (
      <div className="main-container">
        <div className="responsive-container">
          <div className="challenge-container">
            <h1 className="heading">Welcome to Typing Master</h1>
            <p className="info-text">
              You can practice your typing skills here
            </p>
            <label htmlFor="difficultyLevel" className="label">
              Select the level of difficulty:
            </label>
            <br />
            <select
              className="options"
              id="difficultyLevel"
              onChange={this.onChangeDifficultyLevel}
            >
              {difficultyLevelsList.map(eachItem => (
                <option value={eachItem.value}>{eachItem.displayText}</option>
              ))}
            </select>
            <button
              type="submit"
              className="btn start"
              onClick={this.onClickStart}
            >
              Start
            </button>
            <p className="challenge-text">{challengeText}</p>
            <input
              type="text"
              placeholder="Begin the test!"
              className="user-input"
              value={userInputText}
              onChange={this.onChangeUserInput}
            />
            <div className="btn-container">
              <button
                type="submit"
                className="btn submit"
                onClick={this.onClickSubmit}
              >
                Submit
              </button>
              <button
                type="submit"
                className="btn reset"
                onClick={this.onClickReset}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="results-container">
            <h1 className="heading">Results</h1>
            <div>
              <h1 className="accuracy">Accuracy</h1>
              <p className="target">Target: 95%</p>
              <p className="result">Achieved: {userAccuracy} %</p>
            </div>
            <div>
              <h1 className="wpm">Words Per Minute</h1>
              <p className="target">Target: 45 WPM</p>
              <p className="result">Achieved: {wordsPerMinute} WPM</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default TypingMaster
