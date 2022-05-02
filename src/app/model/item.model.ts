import Base from "./base.model"

export default interface Item extends Base {

  name: string
  itemType: string
  description: string
  imageUrl: string

}

