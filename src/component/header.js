import React from 'react'
import { Navbar, Button} from '@blueprintjs/core'

import { DASHBOARD, CHARACTERS, LOCATIONS, ITEMS } from './layout'

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(page) {
    this.props.pageChange(page)
  }

  render() {
    return (
      <header>
        <Navbar>
          <Navbar.Group>
            <Navbar.Heading>DanD | a rpg manager</Navbar.Heading>
            <Navbar.Divider />
            <Button className="bp3-minimal" icon="home"
              text="Dashboard" onClick={this.handleChange.bind(this,DASHBOARD)} />
            <Button className="bp3-minimal" icon="person"
              text="Characters" onClick={this.handleChange.bind(this,CHARACTERS)} />
            <Button className="bp3-minimal" icon="map"
              text="Locations" onClick={this.handleChange.bind(this,LOCATIONS)} />
            <Button className="bp3-minimal" icon="map"
              text="Items" onClick={this.handleChange.bind(this,ITEMS)} />
          </Navbar.Group>
        </Navbar>
      </header>
    )
  }
}
