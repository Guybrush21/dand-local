import React from 'react'
import LocationForm from '../component/location/location.form'
import Store from '../store'
import DandCards from '../component/common/dandCards'
import { Button, Drawer, Dialog, Classes, Intent } from '@blueprintjs/core'


export default class Locations extends React.Component {
  constructor(props) {
    super(props)

    this.store = new Store()

    this.state = {
      locations: [],
      isDeleteDialogOpen: false,
      isLocationSelected: false,
      selectedLocation: null
    }
  }

  onSelectLocation = (location) => {
    this.setState({
      selectedLocation: location,
      isLocationSelected: true
    })
  }
  unSelectLocation = () => {
    this.setState({
      selectedLocation: null,
      isLocationSelected: false
    })
  }

  fetchLocations = async () => {  
    let locations =  await this.store.getAllLocation()    
    //debugger;
    this.setState({locations: locations})
  }

  async componentDidMount() {
    this.fetchLocations()
  }

  handleSubmitLocation = () => {
    this.fetchLocations()
    this.unSelectLocation()
  }

  deleteLocation = () => {
    let deleteResult = this.store.delete(this.state.selectedLocation)
      .then((res) => {
        return res
      })

    if (deleteResult)
      this.handleSubmitLocation()

    this.deleteDialgohandleClose()
  };


  addImage = (e, character) => {
    let image = e.target.files[0]
    this.store.addImage(character, image)
  }

  deleteDialogHandleOpen = () => this.setState({ isDeleteDialogOpen: true });
  deleteDialgohandleClose = () => this.setState({ isDeleteDialogOpen: false });


  render() {
    return (
      <main>
        <article>
          <h2>Locations</h2>
          <Button onClick={() => this.onSelectLocation(null)}
            icon='add'
            disabled={this.state.isLocationSelected}>New</Button>

          <DandCards
            elements={this.state.locations}
            onSelect={this.onSelectLocation}
            title="name"
            subtitle="area"
            description="description"
            imageUrl="imageUrl"
          />

        </article>

        <Drawer isOpen={this.state.isLocationSelected}
          title="Add Location"
          onClose={this.unSelectLocation}
          canOutsideClickClose={true}
          size='40vw'>
          <div className={Classes.DRAWER_BODY}>
            <div className={Classes.DIALOG_BODY}>
              <LocationForm
                submitComplete={this.handleSubmitLocation}
                location={this.state.selectedLocation}
                onDelete={this.deleteDialogHandleOpen}
                addImage={this.addImage} />
            </div>
          </div>
        </Drawer>


        <Dialog isOpen={this.state.isDeleteDialogOpen}
          icon="delete"
          title="Deleting location">
          <div className={Classes.DIALOG_BODY}>
            <p>Do you want to delete this pretty location for real?</p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.deleteDialgohandleClose}>Bless him</Button>
              <Button onClick={this.deleteLocation}
                intent={Intent.DANGER}>Delete that shit!</Button>
            </div>
          </div>
        </Dialog>
      </main>
    )
  }
}
