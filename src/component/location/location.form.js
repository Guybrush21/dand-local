import React from 'react'
import uuid from 'uuid'
import Store from '../../store'
import {
  FormGroup, InputGroup,
  Switch, TextArea
} from '@blueprintjs/core'
import FormButtonGroup from '../common/formButtonGroup'
import Location from '../../model/location'
import ImageFormInput from '../common/imageFormInput'

export default class LocationForm extends React.Component {
  constructor (props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.saveLocation = this.saveLocation.bind(this)

    this.store = new Store()
    this.state = {
      _id: uuid.v4(),
      name: '',
      area: '',
      description: '',
      isFavorite: false,
      isNew: true
    }
    if (this.props.location != null) {
      this.state = { ...this.props.location, isNew: false,
      imageText: 'Choose image...',      
      newImage: null }
    }
  }

  async saveLocation (event) {
    event.preventDefault()

    const newLocation = this.getLocationFromState()
        
    const saveResult = await this.store.addLocation(newLocation, this.state.newImage)
    if (saveResult) { this.props.submitComplete() } else { console.error('Error during saving character') }
  }

  getLocationFromState () {
    const c = new Location()
    c._id = this.state._id
    c._rev = this.state._rev
    c._attachments = this.state._attachments    
    c.name = this.state.name
    c.area = this.state.sex    
    c.isFavorite = this.state.isFavorite
    c.description = this.state.description
    return c
  }

  handleChange (event) {
    const target = event.target
    let value = target.value
    const name = target.name

    if (target.type === 'checkbox') { value = target.checked }

    if (target.type === 'file') {
      if (target.files[0]) {
        this.setState(
          {
            imageText: target.files[0].name,
            imageUrl: URL.createObjectURL(target.files[0]),
            newImage: target.files[0]
          })
      }
    }

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div className='drawer'>
        <FormButtonGroup
          save={this.saveLocation}
          delete={this.props.onDelete}
          canDelete={!this.state.isNew}
        />

        <FormGroup>
          <Switch
            checked={this.state.isFavorite}
            name='isFavorite'
            label='Favorite'
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          label='Name'
          labelFor='name'
        >
          <InputGroup
            name='name' placeholder='name'
            value={this.state.name} onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          label='Area'
          labelFor='area'
        >
          <InputGroup
            name='area' placeholder='area'
            value={this.state.area}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          label='Description'
          labelFor='description'
        >
          <TextArea
            name='description'
            value={this.state.description}
            growVertically
            large
            fill
            onChange={this.handleChange}
          />
        </FormGroup>

        <ImageFormInput
          onChange={this.handleChange}
          alternativeText='character'
          imageUrl={this.state.imageUrl}
          imageText={this.state.imageText}
        ></ImageFormInput>

      </div>

    )
  }
}
