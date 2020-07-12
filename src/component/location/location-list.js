import React from 'react'
import './location.css'

export default class LocationList extends React.Component {
  render () {
    const locationList = this.props.locations.map((l) => (
      <div className='flex-item' key={l._id}>{l.title}<br />{l.description}
      </div>
    ))

    return (
      <article className='flex-container'>
        {locationList}
      </article>
    )
  }
}
