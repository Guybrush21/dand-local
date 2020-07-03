import PouchDB from 'pouchdb'
export const CHARACTER_TYPE = 'CHARACTER'
export const LOCATION_TYPE = 'LOCATION'
export const ITEM_TYPE = 'ITEM'

export default class Store {
  constructor() {

    this.store = new PouchDB('dand')

    this.addCharacter = function (character) {
      character.type = CHARACTER_TYPE
      this.store.put(character)
    }

    this.addLocation = function (location) {
      location.type = LOCATION_TYPE
      this.store.put(location)
    }

    this.addItem = function (item) {
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
        const image = await this.store.getAttachment(id, id)
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

    this.getAllByType = async function (type) {
      const doc = await this.store.allDocs({ include_docs: true, descending: true })
      const result = doc.rows.map(i => i.doc)
        .filter(i_1 => i_1.type === type)      
        await Promise.all(
          result.map(async (el) => {
            el.imageUrl = await this.getImageURL(el._id)
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
      const doc = await this.store.allDocs({
        include_docs: true,
        descending: true
      })
      const result = doc.rows.map(r => r.doc)
        .filter(i => i.type === type && i.isFavorite)

        await Promise.all(
          result.map(async (el) => {
            el.imageUrl = await this.getImageURL(el._id)
          })
        )

      return result
    }

    this.getAllFavoriteCharacthers = async () => this.getFavoriteByType(CHARACTER_TYPE)
    this.getAllFavoriteLocations = async () => this.getFavoriteByType(LOCATION_TYPE)
    this.getAllFavoriteItems = async () => this.getFavoriteByType(ITEM_TYPE)

  }
}
