import React from 'react'
import Store from '../../store'
import uuid from 'uuid'
import {
  FormGroup, InputGroup, Switch, FileInput, TextArea
} from '@blueprintjs/core'
import FormButtonGroup from '../common/formButtonGroup'

export default class ItemForm extends React.Component {
  constructor (props) {
    super(props)
    this.saveItem = this.saveItem.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.store = new Store()

    this.state = {
      _id: uuid.v4(),
      name: '',
      itemtype: '',
      description: '',
      isFavorite: false,
      isNew: true
    }
    if (this.props.item) { this.state = { ...this.props.item, isNew: false } }
  }

  saveItem (event) {
    event.preventDefault()
    const newItem = { ...this.state }
    console.info(newItem)
    this.store.addItem(newItem)
    this.props.submitComplete()
  }

  handleChange (event) {
    const target = event.target
    let value = target.value
    const name = target.name

    if (target.type === 'checkbox') { value = target.checked }

    this.setState({
      [name]: value
    })
  }

  render () {
    return (
      <div className='drawer'>
        <FormButtonGroup
          save={this.saveItem}
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
            name='name' placeholder='name'
            value={this.state.name} onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup
          label='Type'
          labelFor='type'
        >
          <InputGroup
            name='type' placeholder='Type'
            value={this.state.itemtype} onChange={this.handleChange}
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

        {(this.state.imageUrl)
          ? <img
            className='detail-image'
            src={this.state.imageUrl}
            alt='item profile'
            >
            </img>
          : <FormGroup>
            <FileInput
              id='image' name='image'
              onChange={(e) => this.props.addImage(e, this.state)}
              type='file'
            />
            </FormGroup>}

      </div>
    )
  }
}
