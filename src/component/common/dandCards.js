import React from 'react'
import './dandCards.css'
import {Card} from '@blueprintjs/core'

export default class DandCards extends React.Component {
  render() {
    
    const title = this.props.title
    const subtitle = this.props.subtitle
    const description = this.props.description
    const imageUrl = this.props.imageUrl

    const list = this.props.elements.map(c => (
      <Card interactive={true} key={c._id}
        onClick={(e) => this.props.onSelect(c, e)}
        className='flex-card'>                
        <h3>{c[title]}</h3>
        <small>{c[subtitle]}</small>
        <p>{c[description]}</p>
        { (c[imageUrl]) ?  <img src={c[imageUrl]} alt="item" className="dandCards-image"></img>  : '' }
      </Card>
      )
    )

    return (
      <article className="flex-card-container">
        {list}
      </article>
    )
  }
}