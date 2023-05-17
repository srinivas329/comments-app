// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentsList, getFilteredArray, likedComment} = props
  const {name, comment, id, date, isLiked, initialClassName} = commentsList

  const newDate = formatDistanceToNow(date)

  const onDeleteItem = () => {
    getFilteredArray(id)
  }

  const onChangeLike = () => {
    likedComment(id)
  }

  const likeUrl = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

  const likeColor = isLiked ? 'liked-color' : ''

  return (
    <li>
      <div className="comment-tab">
        <div className="profile-container">
          <p className={`${initialClassName} profile`}>{name[0]}</p>
        </div>
        <div className="comment-and-name">
          <div className="date-container">
            <p className="username">{name}</p>
            <p className="date">{newDate}</p>
          </div>

          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-and-delete">
        <button type="button" onClick={onChangeLike} className="button2">
          <img className="like" src={likeUrl} alt="like" />
          <p className={`like-text ${likeColor}`}> Like</p>
        </button>
        <button
          data-testid="delete"
          type="button"
          onClick={onDeleteItem}
          className="button1"
        >
          <img
            className="delete"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
            alt="delete"
          />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
