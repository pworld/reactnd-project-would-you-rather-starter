import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import Questions from './Questions'

class Home extends Component {
  
  render() {
    const {questionsAnswered, questions} = this.props

    const questionsNotAnswered = Object.values(questions).filter(x => !questionsAnswered.includes(x))

    return (
      <div>

        <Tabs defaultActiveKey="not_answered" id="uncontrolled-tab-example">
          <Tab eventKey="answered" title="Answered Questions">

              <ul className='dashboard-list'>
                {questionsAnswered.map((qa) => (
                  <li key={qa.id}>
                    <Questions questionAnswered={qa}/>
                  </li>
                ))}
              </ul>

          </Tab>
          <Tab eventKey="not_answered" title="Not Answered Questions">
            <ul className='dashboard-list'>

              {questionsNotAnswered.map((qan) => (
                <li key={qan.id}>
                  <Questions questionAnswered={qan}/>
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
    authedUser,questions,
    questionsAnswered: Object.values(questions).filter(question => {
      const myQuestion = Object.keys(authedUser.answers).filter(answer => { return answer === question.id})
      if(myQuestion.length > 0){
        return myQuestion[0] === question.id ? question : null
      }
      return null
    }),
  }
}

export default connect(mapStateToProps)(Home)