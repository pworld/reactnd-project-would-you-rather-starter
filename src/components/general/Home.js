import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import Questions from '../questions/Questions'
import {sortTime} from '../../utils/helpers'

class Home extends Component {

  render() {
    const {authedUser, history, questions} = this.props

    const questionsAnswered = sortTime(Object.values(questions).filter(question => authedUser.answers[question.id]))
    const questionsUnAnswered = sortTime(Object.values(questions).filter(question => !authedUser.answers[question.id]))

    return (
      <div>

        <Tabs defaultActiveKey="not_answered" id="uncontrolled-tab-example">
          <Tab eventKey="not_answered" title="Unanswered Questions">
            <ul className='dashboard-list'>
              {questionsUnAnswered && questionsUnAnswered.map((qan) => (
                <li key={qan.id}>
                  <Questions questionAnswered={qan} history={history} type="unanswered"/>
                </li>
              ))}
            </ul>
          </Tab>

          <Tab eventKey="answered" title="Answered Questions">
              <ul className='dashboard-list'>
                { questionsAnswered && questionsAnswered.map((qa) => (
                  <li key={qa.id}>
                    <Questions questionAnswered={qa} history={history} type="answered"/>
                  </li>
                ))}
              </ul>
          </Tab>
        </Tabs>
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(Home)