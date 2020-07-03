import React from 'react'
import uuid from 'uuid'
import Store from '../../store'
import {
  Button, FormGroup, InputGroup,
  Intent, Switch, FileInput, TextArea
} from '@blueprintjs/core'

export default class LocationForm extends React.Component {
  constructor(props) {
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
      isNew: true,
    }
    if(this.props.location != null){
      this.state = {...this.props.location, isNew: false}
    }
  }

  saveLocation(event) {
    event.preventDefault()

    const newLocation = {...this.state}
    this.store.addLocation(newLocation)
    console.info(newLocation)
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
        <FormGroup>
          <Switch checked={this.state.isFavorite}
            name="isFavorite"
            label="Favorite"
            onChange={this.handleChange} />
        </FormGroup>
        <FormGroup
          label="Name"
          labelFor="name">
          <InputGroup name="name" placeholder="name"
            value={this.state.name} onChange={this.handleChange} />
        </FormGroup>
        <FormGroup
          label="Area"
          labelFor="area">
          <InputGroup name="area" placeholder="area"
            value={this.state.area}
            onChange={this.handleChange} />
        </FormGroup>  
        <FormGroup
          label="Description"
          labelFor="description">
          <TextArea name="description"           
            value={this.state.description}
            growVertically={true}
            large={true}    
            fill={true}   
            onChange={this.handleChange} />
        </FormGroup>      


        {(this.state.imageUrl) ?
          <img className="detail-image" 
          src={this.state.imageUrl} 
          alt='location' >            
          </img>
          :
          <FormGroup>
            <FileInput id="image" name="image"
              onChange={(e) => this.props.addImage(e, this.state)}
              type="file" ></FileInput >
          </FormGroup>
        }

        <FormGroup>
          <Button onClick={(e) => this.props.onDelete(this.props.location)}
            text="Delete"
            intent={Intent.DANGER}
            disabled={this.state.isNew} />
        </FormGroup>
        <Button text='Save' onClick={this.saveLocation}
          intent={Intent.PRIMARY} />

      </div>
      
    )
  }
}
