'use strict'

class StoreTodo {
  get rules () {
    return {
      title:"required|min:3"
    }
  }
  get messages () {
    return {
      "title.required":"Alan Gerekli",
      "title.min":"Çok Kısa",
    }
  }
}

module.exports = StoreTodo
