import React from 'react'
import Store from '../../store'
import uuid from 'uuid'
import {
  FormGroup, InputGroup, RadioGroup, Radio, Switch, FileInput, TextArea
} from '@blueprintjs/core'
import FormButtonGroup from '../common/formButtonGroup'
import Chatacter from '../../model/character'

export default class CharacterForm extends React.Component {
  constructor (props) {
    super(props)
    this.saveCharacter = this.saveCharacter.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.store = new Store()

    this.state = {
      _id: uuid.v4(),
      name: '',
      class: '',
      sex: '',
      race: '',
      description: '',
      isFavorite: false,
      isNew: true,
      imageText: 'Choose image...',
      newImage: null
    }
    if (this.props.character) { this.state = { ...this.props.character, isNew: false, newImage: null } }
  }

  saveCharacter (event) {
    event.preventDefault()
    const newChar = this.getCharacterFromState()

    const saveResult = this.store.addCharacter(newChar, this.state.newImage)
    if (saveResult) { this.props.submitComplete() } else { console.error('Error during saving character') }
  }

  getCharacterFromState () {
    const c = new Chatacter()
    c._id = this.state._id
    c._rev = this.state._rev
    c.class = this.state.class
    c.name = this.state.name
    c.sex = this.state.sex
    c.race = this.state.race
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
          save={this.saveCharacter}
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
        <FormGroup label='Name' labelFor='name'>
          <InputGroup
            name='name' placeholder='Name'
            value={this.state.name} onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup label='Race' labelFor='race'>
          <InputGroup
            name='race' placeholder='Race'
            value={this.state.race}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup label='Class' labelFor='class'>
          <InputGroup
            name='class' placeholder='Class'
            value={this.state.class}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <RadioGroup
            label='Sex'
            name='sex'
            onChange={this.handleChange}
            selectedValue={this.state.sex}
          >
            <Radio label='Male' value='male' />
            <Radio label='Female' value='female' />
          </RadioGroup>
        </FormGroup>
        <FormGroup label='Description' labelFor='description'>
          <TextArea
            name='description'
            growVertically
            large
            fill
            onChange={this.handleChange}
            value={this.state.description}
          />
        </FormGroup>
        <div>
          {(this.state.imageUrl)
            ? <img
              className='detail-image'
              src={this.state.imageUrl}
              alt='character profile'
              >
              </img>
            : ''}
          <FormGroup>
            <FileInput
              id='image' name='image' text={this.state.imageText}
              onChange={this.handleChange} fill
              type='file'
            />
          </FormGroup>

        </div>
      </div>
    )
  }
}
