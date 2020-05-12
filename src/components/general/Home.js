import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import Questions from '../questions/Questions'

class Home extends Component {
  render() {
    const {questionsCategory,history} = this.props
    return (
      <div>

        <Tabs defaultActiveKey="not_answered" id="uncontrolled-tab-example">
          <Tab eventKey="not_answered" title="Unanswered Questions">
            <ul className='dashboard-list'>
              {questionsCategory.unAnswered && questionsCategory.unAnswered.map((qan) => (
                <li key={qan.id}>
                  <Questions questionAnswered={qan} history={history} type="unanswered"/>
                </li>
              ))}
            </ul>
          </Tab>

          <Tab eventKey="answered" title="Answered Questions">
              <ul className='dashboard-list'>
                { questionsCategory.answered && questionsCategory.answered.map((qa) => (
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

function mapStateToProps ({ questionsCategory }) {
  return {
    questionsCategory
  }
}

export default connect(mapStateToProps)(Home)