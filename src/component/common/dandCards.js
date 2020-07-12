import React from 'react'
import './dandCards.css'
import { Card, Icon, Intent } from '@blueprintjs/core'

export default class DandCards extends React.Component {
  render () {
    const title = this.props.title
    const subtitle = this.props.subtitle
    const subtitle2 = this.props.subtitle2
    const description = this.props.description
    const imageUrl = this.props.imageUrl

    const list = this.props.elements.map(c => (
      <Card
        interactive key={c._id}
        onClick={(e) => this.props.onSelect(c, e)}
        className='flex-card'
      >

        <div className='dandcard-relative'>
          {(c.isFavorite) ? <Icon
            className='favorite-icon'
            icon='bookmark'
            intent={Intent.PRIMARY}
            iconSize='64'
                            >
          </Icon> : ''}

          <strong>{c[title]}</strong>
          <small className='inline'>{c[subtitle]}{c[subtitle2] ? ' - ' + c[subtitle2] : ''}</small>
          <section className='dandcard-flexcontainer'>
            <p>{c[description]}</p>
            <img src={c[imageUrl]} alt='item' className='dandCards-image' />
          </section>

        </div>

      </Card>
    ))

    return (
      <article className='flex-card-container'>
        {list}
      </article>
    )
  }
}
