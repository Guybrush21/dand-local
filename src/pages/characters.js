import React from 'react'
import DandCards from '../component/common/dandCards'
import CharacterForm from '../component/character/character.form'
import Store from '../store'
import { Button, Drawer, Dialog, Classes, Intent, ButtonGroup } from '@blueprintjs/core'
import '../component/character/character.css'
import CharacterGenerator from "../generators/characterGenerator"

export default class Characters extends React.Component {
  constructor(props) {
    super(props)

    this.store = new Store()
    this.characterGenerator = new CharacterGenerator()

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
      }
    )
  }

  handleSubmitCharacter = () => {
    this.unSelectCharacter()
    this.fetchCharacters()
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

  componentDidMount() {
    this.fetchCharacters()
  }

  render() {
    return (
      <main>
        <article>
          <h2>Characters</h2>
          <ButtonGroup>
            <Button onClick={() => this.onSelectCharacter(null)}
              icon='add'
              disabled={this.state.isCharacterSelected}>New</Button>

            <Button onClick={() => this.onSelectCharacter(this.characterGenerator.next())}
              icon='random'
              disabled={this.state.isCharacterSelected}>Create Random</Button>
          </ButtonGroup>

          <DandCards
            elements={this.state.characters}
            onSelect={this.onSelectCharacter}
            title="name"
            subtitle="class"
            subtitle2="race"
            description="description"
            imageUrl="imageUrl"
          />
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
                onDelete={this.deleteDialogHandleOpen}/>
            </div>
          </div>
        </Drawer>


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
