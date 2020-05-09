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

// export function formatTweet (tweet, author, authedUser, parentTweet) {
//   const { id, likes, replies, text, timestamp } = tweet
//   const { name, avatarURL } = author

//   return {
//     name,
//     id,
//     timestamp,
//     text,
//     avatar: avatarURL,
//     likes: likes.length,
//     replies: replies.length,
//     hasLiked: likes.includes(authedUser),
//     parent: !parentTweet ? null : {
//       author: parentTweet.author,
//       id: parentTweet.id,
//     }
//   }
// }