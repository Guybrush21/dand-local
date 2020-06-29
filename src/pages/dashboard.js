import React from 'react'

export default class Dashboard extends React.Component {


  render() {
    return (
      <main>
        <h2>Dashboard</h2>
        <div className="dashboard">
          <article>
            <h3>Characters</h3>
          </article>
          <article>
            <h3>Location</h3>
          </article>
          <article>
            <h3>Items</h3>
          </article>
        </div>
      </main>
    )
  }
}
