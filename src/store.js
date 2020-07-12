import PouchDB from 'pouchdb'
import { v4 } from 'uuid'
import defaultMaleImg from "./assets/default-male.svg"
import defaultFemaleImg from "./assets/default-female.svg"

const CHARACTER_TYPE = 'CHARACTER'
const LOCATION_TYPE = 'LOCATION'
const ITEM_TYPE = 'ITEM'
const CHAREACTER_PROFILE = 'CHAREACTER_PROFILE'


export default class Store {
  constructor() {

    this.store = new PouchDB('dand')

    this.addCharacter = function (character, image = null) {
      character.type = CHARACTER_TYPE

      if (!character._id)
        character._id = v4()

      // let doc = await this.store.get(character._id)
      // character._rev = doc._rev

      return this.store.put(character).then(res => {
        if (image != null) {
          return this.store.putAttachment(res.id, CHAREACTER_PROFILE, res.rev, image, image.type).then(imgRes => {return imgRes.ok})
        }  
        return res.ok
      })

    }

    this.addLocation = function (location, image = null) {
      if (!location._id) location._id = v4()
      location.type = LOCATION_TYPE
      this.store.put(location)
    }

    this.addItem = function (item, image = null) {
      if (!item._id) item._id = v4()
      item.type = ITEM_TYPE
      this.store.put(item)
    }

    this.add = function (obj, name) {
      obj.type = name
      this.store.put(obj)
    }

    this.addImage = function (item, attachment) {
      this.store.putAttachment(item._id, item._id, item._rev, attachment, attachment.type)
        .then((res) => console.log(res))
    }

    this.getImageURL = async (id) => {
      try {
        const image = await this.store.getAttachment(id, CHAREACTER_PROFILE)
        let url = URL.createObjectURL(image)
        return url
      }
      catch (e) {
        console.error(e)
      }
    }

    this.getAllCharacter = function () {
      return this.getAllByType(CHARACTER_TYPE)
    }

    this.getAllLocation = function () {
      return this.getAllByType(LOCATION_TYPE)
    }

    this.getAllItem = function () {
      return this.getAllByType(ITEM_TYPE)
    }

    this.getAllByTypeName = function (typeName) {
      return this.getAllByType(typeName)
    }

    this.getDefaultImage = (el) => {
      if (el.type === CHARACTER_TYPE) {
        if (el.sex === "male")
          return defaultMaleImg
        else
          return defaultFemaleImg
      }
    }

    this.getAllByType = async function (type) {
      const doc = await this.store.allDocs({ include_docs: true, descending: true })
      const result = doc.rows.map(i => i.doc)
        .filter(i_1 => i_1.type === type)
      await Promise.all(
        result.map(async (el) => {
          el.imageUrl = await this.getImageURL(el._id)
          if (el.imageUrl === undefined)
            el.imageUrl = this.getDefaultImage(el)
        })
      )
      return result
    }

    this.delete = function (item) {
      return this.store.remove(item)
        .then(function (val) {
          return val.ok
        })
    }

    this.update = function (item) {
      return this.store.put(item)
        .then(function (val) { return val.ok })
    }

    this.getFavoriteByType = async function (type) {
      const doc = await this.getAllByType(type)

      let result = doc.filter(i => i.isFavorite)

      return result
    }

    this.getAllFavoriteCharacthers = async () => this.getFavoriteByType(CHARACTER_TYPE)
    this.getAllFavoriteLocations = async () => this.getFavoriteByType(LOCATION_TYPE)
    this.getAllFavoriteItems = async () => this.getFavoriteByType(ITEM_TYPE)

  }
}
