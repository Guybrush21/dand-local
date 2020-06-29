import React from 'react'
import DandCards from '../component/common/dandCards'
import ItemForm from '../component/item/item.form'
import Store from '../store'
import { Button, Drawer, Dialog, Classes, Intent } from '@blueprintjs/core'
import Item from '../model/item'
import '../component/item/item.css'


export default class Items extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Store()
    
    this.handleSubmitItem = this.handleSubmitItem.bind(this)

    this.state = {
      isItemFormVisible: false,
      isItemSelected: false,
      isDeleteDialogOpen: false,
      selectedItem: {},
      items: []
    }
  }

  fetchItems = () => {    
    this.store.getAllItem().then(
      (items) => {
        this.setState({ items: items })
        
        // update imageUrl for all characters
        items.forEach((c,idx)=> 
          this.store.getImageURL(c._id).then((url) => {
            c.imageUrl = url
            let newitems = [...this.state.items]
            newitems[idx] = c
            this.setState({items: newitems})
          })
        )
      }
    )
  }

  handleSubmitItem() {
    this.fetchItems()    
    this.unSelectItem()
  }

  onSelectItem = (Item) => {
    this.setState({
      selectedItem: Item,
      isItemSelected: true
    })
  }

  unSelectItem = () => {
    this.setState({
      selectedItem: {},
      isItemSelected: false
    })
  }

  deleteDialogHandleOpen = () => this.setState({ isDeleteDialogOpen: true });
  deleteDialgohandleClose = () => this.setState({ isDeleteDialogOpen: false });

  deleteItem = () => {    

    let deleteResult = this.store.delete(this.state.selectedItem)
      .then((res) => {
        return res
      })

    console.debug(deleteResult ? 'Item Deleted' : 'Error Occured in deletion')
    if (deleteResult) {
      this.fetchItems()
      this.setState({
        selectedItem: {},
        isItemSelected: false
      })
    }
    this.deleteDialgohandleClose()
  }

  addImage = (e, item) => {
    let image = e.target.files[0]
    this.store.addImage(item, image)
  }

  componentDidMount() {
    this.fetchItems()
  }

  render() {
    return (
      <main>
        <article>
          <h2>Items</h2>
          <Button onClick={()=>this.onSelectItem(null)} 
            icon='add'
            disabled={this.state.isItemSelected}>New</Button>
        </article>

        <Drawer isOpen={this.state.isItemSelected}
          title="Add new Item"
          onClose={this.unSelectItem}
          canOutsideClickClose={true}
          size='350px'>
          <ItemForm
            submitComplete={this.handleSubmitItem} 
            Item={this.state.selectedItem}
            onDelete={this.deleteDialogHandleOpen}
            addImage={this.addImage} />
        </Drawer>

        <DandCards
          elements={this.state.items}
          onSelect={this.onSelectItem}
          title = "name"
          subtitle = "class"
          description = "description"
          imageUrl = "imageUrl"
          />

        <Dialog isOpen={this.state.isDeleteDialogOpen}
          icon="delete"
          title="Deleting Item">
          <div className={Classes.DIALOG_BODY}>
            <p>Do you want to delete this pretty Item for real?</p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.deleteDialgohandleClose}>Bless it</Button>
              <Button onClick={this.deleteItem}
              intent={Intent.DANGER}>Delete that shit!</Button>
            </div>
          </div>
        </Dialog>
      </main>
    )
  }
}
