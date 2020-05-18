import React, { Component } from 'react'
import {Container, Row, Col } from 'react-bootstrap';
import {Redirect} from 'react-router-dom'
import { connect } from 'react-redux'

import { handleAddAnswer } from '../../actions/questions'
import  Pool from './Pool'
import  PoolQuestion from './PoolQuestion'
class QuestionAnswer extends Component {

  state = {
    answer: 'optionOne',
    question: {},
    isPoolQuestion: true,
  }

  onSiteChanged = (e) => {
    const value = e.target.value

    this.setState(() => ({
      answer:value
    }))
  }

  onHandleSubmit = (e) => {
    e.preventDefault()

    const { answer } = this.state
    const { dispatch, question, authedUser } = this.props

    dispatch(handleAddAnswer(authedUser, this.props.match.params.id, answer))

    setTimeout(() => {
      this.setState(() => ({
        isPoolQuestion:false,
        question
      }))
    }, 1500)

  }

  render() {
    const {questions, authedUser} = this.props
    const questionID = this.props.match.params.id
    const question = questions[questionID]

    if(typeof question === 'undefined'){
      return (<Redirect to='/404' />)
    }else if( authedUser === null){
      return (<Redirect to='/login' />)
    }

    const answerSelected = authedUser.answers[questionID] ? 
      authedUser.answers[questionID]: 'optionOne'

    return (
      <Container>

        <Row className="justify-content-md-center app-container-list">
          <Col md={{ span: 3}}>
            <img
              src={`https://robohash.org/${question.author}`}
              alt={`${question.author}`}
              className='avatar'
            />
          </Col>
          <Col md={{ span: 9}}>
            {this.state.isPoolQuestion ? 
              <PoolQuestion 
                answerSelected={answerSelected}
                question={question}
                questionID={questionID} 
                onSiteChanged={this.onSiteChanged}
                onHandleSubmit={this.onHandleSubmit}
                />
            : <Pool questionID={questionID}/>}
          </Col>
        </Row>
      </Container>
    )
  }
}

function mapStateToProps ({ authedUser, questions }) {
  return {
    authedUser,
    questions
  }
}

export default connect(mapStateToProps)(QuestionAnswer)