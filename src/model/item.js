import Base from "./base"

export default class Item 
extends Base {
  constructor () {
    super()
    this.name = ''
    this.itemType = ''
    this.description = ''
    this.imageUrl = ''
    this.isFavorite = false
  }
}
