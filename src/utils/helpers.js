export function formatDate (timestamp) {
  const d = new Date(timestamp)
  const time = d.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString()
}

export function getUser (userID, users) {
  let selectUser = {}
  for (let key in users) {
    if(users[key].id === userID){
      selectUser = users[key]
    }
  }
  return selectUser
}

export function objArr (data) {
  let obj = {}
  for (let index = 0; index < data.length; index++) {
    const singleObj = data[index]
    obj[singleObj.id] = singleObj
  }
  return obj
}

export function sortTime (data) {

  const newSortingArray = data.sort((a,b) => b.timestamp - a.timestamp)

  return newSortingArray
}

export function leaderboardsFormat (users) {
  const scoreUsers = Object.values(users).map(user => {
    const answeredQuestion = Object.keys(user.answers).length
    const createdQuestion = user.questions.length

    return user = {
      id: user.id,
      name: user.name,
      answeredQuestion:answeredQuestion,
      createdQuestion:createdQuestion,
      total: answeredQuestion + createdQuestion,
    }
  })
  const scoreUsersSort = scoreUsers.sort((a,b) => b.total - a.total)
  return scoreUsersSort
}

export function PoolFormat (questions, users, qid) {
  const question = questions[qid]
  const author = question.author

  return {
    author: question.author,
    name: typeof users[author] !== 'undefined' ? users[author].name : null,
    optionOne: `Would you rather ${question.optionOne.text}`,
    optionTwo: `Would you rather ${question.optionTwo.text}`,
    optionOneText: question.optionOne.votes.length > 0 ? `1 out of ${question.optionOne.votes.length} votes` : `0 votes`,
    optionTwoText: question.optionTwo.votes.length > 0 ? `1 out of ${question.optionTwo.votes.length} votes` : `0 votes`,
    optionOnePercentage: question.optionOne.votes.length > 0 ? Math.round( (1 / question.optionOne.votes.length) * 100 ) : 0,
    optionTwoPercentage: question.optionTwo.votes.length > 0 ? Math.round( (1 / question.optionTwo.votes.length) * 100 ) : 0,
  }
}