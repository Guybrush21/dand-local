import React from 'react'
import Store from '../../store'
import uuid from 'uuid'
import {
  FormGroup, InputGroup, RadioGroup, Radio, Switch, FileInput, TextArea
} from '@blueprintjs/core'
import FormButtonGroup from '../common/formButtonGroup'

export default class CharacterForm extends React.Component {
  constructor(props) {
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
    }
    if (this.props.character)
      this.state = { ...this.props.character, isNew: false }

  }

  saveCharacter(event) {
    event.preventDefault()
    const newChar = { ...this.state }
    console.info(newChar)
    this.store.addCharacter(newChar)
    this.props.submitComplete()
  }

  handleChange(event) {
    const target = event.target
    let value = target.value
    const name = target.name

    if (target.type === 'checkbox')
      value = target.checked

    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className='drawer'>        
        <FormButtonGroup
          save={this.saveCharacter}
          delete={this.props.onDelete}
          canDelete={!this.state.isNew}
        ></FormButtonGroup>
        <FormGroup>
          <Switch checked={this.state.isFavorite}
            name="isFavorite"
            label="Favorite"
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup label="Name" labelFor="name">
          <InputGroup name="name" placeholder="Name"
            value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup label="Race" labelFor="race">
          <InputGroup name="race" placeholder="Race"
            value={this.state.race}
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup label="Class" labelFor="class">
          <InputGroup name="class" placeholder="Class"
            value={this.state.class}
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <RadioGroup
            label="Sex"
            name="sex"
            onChange={this.handleChange}
            selectedValue={this.state.sex}>
            <Radio label="Male" value="male" />
            <Radio label="Female" value="female" />
          </RadioGroup>
        </FormGroup>
        <FormGroup label="Description" labelFor="description">
          <TextArea
            name='description'
            growVertically={true}
            large={true}
            fill={true}
            onChange={this.handleChange}
            value={this.state.description}
          />
        </FormGroup>
        <div>
          {(this.state.imageUrl) ?
            <img className="detail-image"
              src={this.state.imageUrl}
              alt='character profile' >
            </img>
            :
            <FormGroup>
              <FileInput id="image" name="image"
                onChange={(e) => this.props.addImage(e, this.state)}
                type="file" ></FileInput >
            </FormGroup>
          }
        </div>
      </div>
    )
  }
}
