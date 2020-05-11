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
