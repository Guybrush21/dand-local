import PouchDB from 'pouchdb'
import { v4 } from 'uuid'
import defaultMaleImg from './assets/default-male.svg'
import defaultFemaleImg from './assets/default-female.svg'
import defaultSwordImg from './assets/sword.svg'
import defaultPotionImg from './assets/bottle.svg'
import defaultTavernImg from './assets/tavern.svg'
import defaultTowerImg from './assets/tower.svg'

const CHARACTER_TYPE = 'CHARACTER'
const LOCATION_TYPE = 'LOCATION'
const ITEM_TYPE = 'ITEM'
const CHARACTER_PROFILE = 'CHARACTER_PROFILE'

export default class Store {
  constructor() {
    this.store = new PouchDB('dand')

    this.addCharacter = async function (character, image = null) {
      character.type = CHARACTER_TYPE

      if (!character._id) { character._id = v4() }

      const res = await this.store.put(character)
      if (image != null) {
        return this.store.putAttachment(res.id, CHARACTER_PROFILE, res.rev, image, image.type)
          .then(imgRes => { return imgRes.ok })
      }
      return res.ok
    }

    this.addLocation = async function (location, image = null) {
      if (!location._id) location._id = v4()
      location.type = LOCATION_TYPE

      const res = await this.store.put(location)
      if (image != null) {
        return this.store.putAttachment(res.id, CHARACTER_PROFILE, res.rev, image, image.type)
          .then(imgRes => { return imgRes.ok })
      }
      return res.ok

    }

    this.addItem = async function (item, image = null) {
      if (!item._id) item._id = v4()
      item.type = ITEM_TYPE
      const res = await this.store.put(item)
      if (image != null) {
        return this.store.putAttachment(res.id, CHARACTER_PROFILE, res.rev, image, image.type)
          .then(imgRes => { return imgRes.ok })
      }
      return res.ok

    }

    this.getImageURL = async (id) => {
      try {
        const image = await this.store.getAttachment(id, CHARACTER_PROFILE)
        const url = URL.createObjectURL(image)
        return url
      } catch (e) {
        console.debug(e)
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
        if (el.sex === 'male') { return defaultMaleImg }
        else { return defaultFemaleImg }
      }
      if (el.type === ITEM_TYPE) {
        if (el.name.length % 2 === 0) { return defaultSwordImg }
        else { return defaultPotionImg}
      }
      if (el.type === LOCATION_TYPE) {
        if (el.name.length % 2 === 0) { return defaultTowerImg }
        else { return defaultTavernImg}
      }
      else console.error("Missing default image for " + el.type)
    }

    this.getAllByType = async function (type) {
      const doc = await this.store.allDocs({ include_docs: true, descending: true })
      const result = doc.rows.map(i => i.doc)
        .filter(i_1 => i_1.type === type)
      await Promise.all(
        result.map(async (el) => {
          el.imageUrl = await this.getImageURL(el._id)
          if (el.imageUrl === undefined) { el.imageUrl = this.getDefaultImage(el) }
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

      const result = doc.filter(i => i.isFavorite)

      return result
    }

    this.getAllFavoriteCharacthers = async () => this.getFavoriteByType(CHARACTER_TYPE)
    this.getAllFavoriteLocations = async () => this.getFavoriteByType(LOCATION_TYPE)
    this.getAllFavoriteItems = async () => this.getFavoriteByType(ITEM_TYPE)
  }
}
