import React from 'react'

export default function Post({ username, imageUrl, description }) {
  return (
    <div className="post">
      <div className="post-header">
        <span className="username">{username}</span>
      </div>
      <img className="post-image" src={imageUrl} alt="Post" />
      <div className="post-caption">
        <span className="username">{username}</span>
        <span className="caption-text">{description}</span>
      </div>
    </div>
  )
}
