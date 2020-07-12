import React from 'react'
import Store from '../../store'
import uuid from 'uuid'
import {
  FormGroup, InputGroup, Switch, TextArea
} from '@blueprintjs/core'
import FormButtonGroup from '../common/formButtonGroup'
import Item from '../../model/item'
import ImageFormInput from '../common/imageFormInput'

export default class ItemForm extends React.Component {
  constructor(props) {
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
      isNew: true,
      imageText: 'Choose image...',
      imageUrl: null,
      newImage: null
    }
    if (this.props.item) { this.state = { ...this.props.item, isNew: false, newImage: null } }
  }

  getItemFromState() {
    const item = new Item()
    item._id = this.state._id
    item._rev = this.state._rev
    item._attachments = this.state._attachments
    item.name = this.state.name
    item.itemtype = this.state.itemtype
    item.description = this.state.description
    item.isFavorite = this.state.isFavorite
    return item
  }

  async saveItem(event) {
    event.preventDefault()
    const newItem = this.getItemFromState()

    const saveResult = await this.store.addItem(newItem, this.state.newImage)
    if (saveResult)
      this.props.submitComplete()
    else
      console.error('Error during saving item')
  }

  handleChange(event) {
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

  render() {
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
            name='itemtype' placeholder='Type'
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
        <ImageFormInput
          onChange={this.handleChange}
          alternativeText='item'
          imageUrl={this.state.imageUrl}
          imageText={this.state.imageText}
        ></ImageFormInput>
      </div>
    )
  }
}
