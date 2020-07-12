import Base from "./base"

export default class Character extends Base {
  constructor () {
    super()
    this.name = ''
    this.type = ''
    this.sex = ''
    this.description = ''
    this.class = ''
    this.race = ''
    this.imageUrl = ''
    this.isFavorite = false
  }
}
