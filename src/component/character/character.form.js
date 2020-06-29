import React from 'react'
import Store from '../../store'
import uuid from 'uuid'
import {
  Button, FormGroup, InputGroup,
  RadioGroup, Radio, Intent, Switch, FileInput
} from '@blueprintjs/core'
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
      isFavorite: false,
      isNew: true,      
    }
    if(this.props.character)
      this.state = {...this.props.character, isNew: false}

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
        <FormGroup
          label="Name"
          labelFor="name"
          labelInfo="(required)">
          <InputGroup name="name" placeholder="name"
            value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup
          label="Class"
          labelFor="class"
          labelInfo="(required)">
          <InputGroup name="class" placeholder="class"
            value={this.state.class}
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup>
          <RadioGroup
            label="Sex" name="sex"
            onChange={this.handleChange}
            selectedValue={this.state.sex}>
            <Radio label="Male" value="male" />
            <Radio label="Female" value="female" />
          </RadioGroup>
        </FormGroup>
        <FormGroup>
          <Switch checked={this.state.isFavorite}
            name="isFavorite"
            label="Favorite"
            onChange={this.handleChange} />
        </FormGroup>


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

        <FormGroup>
          <Button onClick={(e) => this.props.onDelete(this.props.character)}
            text="Delete"
            intent={Intent.DANGER}
            disabled={this.state.isNew} />
        </FormGroup>
        <Button text='Save' onClick={this.saveCharacter}
          intent={Intent.PRIMARY} />

      </div>
    )
  }
}
