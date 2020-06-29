import React from 'react'
import DandCards from '../component/common/dandCards'
import CharacterForm from '../component/character/character.form'
import Store from '../store'
import { Button, Drawer, Dialog, Classes, Intent } from '@blueprintjs/core'
import '../component/character/character.css'

export default class Characters extends React.Component {
  constructor(props) {
    super(props)
    this.store = new Store()

    this.handleSubmitCharacter = this.handleSubmitCharacter.bind(this)

    this.state = {
      isCharacterFormVisible: false,
      isCharacterSelected: false,
      isDeleteDialogOpen: false,
      selectedCharacter: {},
      characters: []
    }
  }

  fetchCharacters = () => {
    this.store.getAllCharacter().then(
      (characters) => {
        this.setState({ characters: characters })

        // update imageUrl for all characters
        characters.forEach((c, idx) =>
          this.store.getImageURL(c._id).then((url) => {
            c.imageUrl = url
            let newcharacthers = [...this.state.characters]
            newcharacthers[idx] = c
            this.setState({ characters: newcharacthers })
          })
        )
      }
    )
  }

  handleSubmitCharacter() {
    this.fetchCharacters()
    this.unSelectCharacter()
  }

  onSelectCharacter = (character) => {
    this.setState({
      selectedCharacter: character,
      isCharacterSelected: true
    })
  }

  unSelectCharacter = () => {
    this.setState({
      selectedCharacter: {},
      isCharacterSelected: false
    })
  }

  deleteDialogHandleOpen = () => this.setState({ isDeleteDialogOpen: true });
  deleteDialgohandleClose = () => this.setState({ isDeleteDialogOpen: false });

  deleteCharacter = () => {

    let deleteResult = this.store.delete(this.state.selectedCharacter)
      .then((res) => {
        return res
      })

    console.debug(deleteResult ? 'Character Deleted' : 'Error Occured in deletion')
    if (deleteResult) {
      this.fetchCharacters()
      this.setState({
        selectedCharacter: {},
        isCharacterSelected: false
      })
    }
    this.deleteDialgohandleClose()
  }

  addImage = (e, character) => {
    let image = e.target.files[0]
    this.store.addImage(character, image)
  }

  componentDidMount() {
    this.fetchCharacters()
  }

  render() {
    return (
      <main>
        <article>
          <h2>Characters</h2>
          <Button onClick={() => this.onSelectCharacter(null)}
            icon='add'
            disabled={this.state.isCharacterSelected}>New</Button>
        </article>

        <Drawer isOpen={this.state.isCharacterSelected}
          title="Add new Character"
          onClose={this.unSelectCharacter}
          canOutsideClickClose={true}
          size='40vw'>
          <div className={Classes.DRAWER_BODY}>
            <div className={Classes.DIALOG_BODY}>
              <CharacterForm
                submitComplete={this.handleSubmitCharacter}
                character={this.state.selectedCharacter}
                onDelete={this.deleteDialogHandleOpen}
                addImage={this.addImage} />
            </div>
          </div>
        </Drawer>

        <DandCards
          elements={this.state.characters}
          onSelect={this.onSelectCharacter}
          title="name"
          subtitle="class"
          description="description"
          imageUrl="imageUrl"
        />

        <Dialog isOpen={this.state.isDeleteDialogOpen}
          icon="delete"
          title="Deleting character">
          <div className={Classes.DIALOG_BODY}>
            <p>Do you want to delete this pretty character for real?</p>
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Button onClick={this.deleteDialgohandleClose}>Bless him</Button>
              <Button onClick={this.deleteCharacter}
                intent={Intent.DANGER}>Delete that bitch!</Button>
            </div>
          </div>
        </Dialog>
      </main>
    )
  }
}
