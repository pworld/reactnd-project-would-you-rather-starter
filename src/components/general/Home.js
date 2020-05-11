import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Tabs, Tab } from 'react-bootstrap'

import Questions from '../questions/Questions'

class Home extends Component {
  
  render() {
    const {questionsCategory} = this.props

    return (
      <div>

        <Tabs defaultActiveKey="not_answered" id="uncontrolled-tab-example">
          <Tab eventKey="answered" title="Answered Questions">

              <ul className='dashboard-list'>
                { questionsCategory.answered && questionsCategory.answered.map((qa) => (
                  <li key={qa.id}>
                    <Questions questionAnswered={qa}/>
                  </li>
                ))}
              </ul>

          </Tab>
          <Tab eventKey="not_answered" title="Not Answered Questions">

            <ul className='dashboard-list'>
              {questionsCategory.notAnswered && questionsCategory.notAnswered.map((qan) => (
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

function mapStateToProps ({ questionsCategory }) {
  return {
    questionsCategory
  }
}

export default connect(mapStateToProps)(Home)