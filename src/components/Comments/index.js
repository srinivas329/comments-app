import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

const initialCommentsList = [
  {
    id: uuidv4(),
    name: ' ',
    comment: '',
    date: new Date(),
    isLiked: false,
    initialClassName: ' ',
  },
]

// Write your code here
class Comments extends Component {
  state = {commentList: initialCommentsList, name: '', comment: ''}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeText = event => {
    this.setState({comment: event.target.value})
  }

  onSubmitEvent = event => {
    event.preventDefault()
    const {name, comment} = this.state

    const initialBackgroundColorClassName = `initial-container ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      date: new Date(),
      isLiked: false,
      initialClassName: initialBackgroundColorClassName,
    }

    this.setState(prevState => ({
      commentList: [...prevState.commentList, newComment],
      name: '',
      comment: '',
    }))
  }

  likedComment = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(each => {
        if (id === each.id) {
          return {...each, isLiked: !each.isLiked}
        }
        return each
      }),
    }))
  }

  getFilteredArray = id => {
    const {commentList} = this.state
    const filteredList = commentList.filter(each => each.id !== id)

    this.setState({commentList: filteredList})
  }

  render() {
    const {commentList, name, comment} = this.state
    const newCommentList = commentList.slice(1)

    return (
      <div className="bg-container ">
        <div className="card">
          <div className="top-card">
            <div>
              <h1 className="heading">Comments</h1>
              <form className="form-container" onSubmit={this.onSubmitEvent}>
                <p className="tag">Say something about 4.O Technologies</p>
                <input
                  onChange={this.onChangeName}
                  value={name}
                  placeholder="Your Name"
                  className="input"
                  type="text"
                />
                <textarea
                  placeholder="Your Comment"
                  value={comment}
                  onChange={this.onChangeText}
                  className="text-area"
                  cols="40"
                  rows="5"
                >
                  {' '}
                </textarea>
                <button className="button" type="submit">
                  Add Comment
                </button>
              </form>
            </div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="image"
            />
          </div>
          <hr />
          <div>
            <div className="count-tab">
              <p className="count">{commentList.length - 1}</p>
              <p className="count-name">Comments</p>
            </div>
            <ul className="ul-list">
              {newCommentList.map(each => (
                <CommentItem
                  commentsList={each}
                  getFilteredArray={this.getFilteredArray}
                  key={each.id}
                  likedComment={this.likedComment}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Comments
