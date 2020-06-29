import React from 'react'
import Store from '../../store'
import uuid from 'uuid'
import {
  Button, Drawer, Label, FormGroup, InputGroup,
  RadioGroup, Radio, Intent, Switch, FileInput
} from '@blueprintjs/core'
export default class ItemForm extends React.Component {
  constructor(props) {
    super(props)
    this.saveItem = this.saveItem.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.store = new Store()

    this.state = {
      _id: uuid.v4(),
      name: '',
      isFavorite: false,
      isNew: true,      
    }
    if(this.props.item)
      this.state = {...this.props.item, isNew: false}

  }

  saveItem(event) {
    event.preventDefault()
    const newItem = { ...this.state }
    console.info(newItem)
    this.store.addItem(newItem)
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
          label="Description"
          labelFor="description"
          labelInfo="(required)">
          <InputGroup name="description" placeholder="description"
            value={this.state.description}
            onChange={this.handleChange} />
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
          alt='item profile' >            
          </img>
          :
          <FormGroup>
            <FileInput id="image" name="image"
              onChange={(e) => this.props.addImage(e, this.state)}
              type="file" ></FileInput >
          </FormGroup>
        }

        <FormGroup>
          <Button onClick={(e) => this.props.onDelete(this.props.item)}
            text="Delete"
            intent={Intent.DANGER}
            disabled={this.state.isNew} />
        </FormGroup>
        <Button text='Save' onClick={this.saveItem}
          intent={Intent.PRIMARY} />

      </div>
    )
  }
}
