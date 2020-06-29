import Header from './header'
import React from 'react'
import Characters from '../pages/characters'
import Locations from '../pages/locations'
import Items from '../pages/characters'
import Dashboard from '../pages/dashboard'

export const DASHBOARD = 'DASHBOARD'
export const CHARACTERS = 'CHARACTERS'
export const LOCATIONS = 'LOCATIONS'
export const ITEMS = 'ITEMS'

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
    this.state = { layout: DASHBOARD }    
  }
  onPageChange(page) {
    this.setState({ layout: page })
  }

  render() {
    return (
      <div id='dand-layout'>
        <Header pageChange={this.onPageChange.bind(this)} />
        
        <div id='root-flex'>          
          {this.state.layout === CHARACTERS && <Characters />}
          {this.state.layout === LOCATIONS && <Locations />}
          {this.state.layout === ITEMS && <Items />}
          {this.state.layout === DASHBOARD && <Dashboard />}
        </div>
      </div>
    )
  }
}
