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

    this.addItem = function(item) {
      item.type = ITEM_TYPE
      this.store.put(item)
    }

    this.add = function(obj, name) {
      obj.type = name
      this.store.put(obj)
    }

    this.addImage = function (item, attachment) {
      this.store.putAttachment(item._id, item._id, item._rev, attachment, attachment.type)
        .then((res) => console.log(res))
    }

    this.getImageURL = (id) => {
      return this.store.getAttachment(id, id)
        .then((image) => {
          let url = URL.createObjectURL(image)
          return url
        })
        .catch((e) => {          
          console.error(e)
        })
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

    this.getAllByTypeName = function(typeName) {
      return this.getAllByType(typeName)
    }

    this.getAllByType = function (type) {
      return this.store.allDocs({ include_docs: true, descending: true })
        .then(function (doc) {
          return doc.rows.map(i => i.doc)
            .filter(i => i.type === type)
        })
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
  }
}
