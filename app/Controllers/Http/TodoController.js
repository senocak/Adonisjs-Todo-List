'use strict'
const Todo = use("App/Models/Todo")
const {validate} = use('Validator')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class TodoController {
  async index ({ request, response, view,auth }) {
    //const todos = await Todo.all()
      const todos = await Todo.query().where("user_id",auth.user.id).fetch()
    return view.render("index",{
      todos:todos.toJSON(),
      name:auth.user.username
    })
  }
  async create ({ request, response, view }) {
  }
  async store ({ request, session, response,auth }) {
    const todo = await Todo.create({
      title:request.input("title"),
      user_id:auth.user.id
    })
    session.flash({successMessage:"Eklendi"})
    return response.redirect("back")
  }
  async show ({ params, request, response, view }) {
  }
  async edit ({ params, auth, response, view }) {
    const todo=await Todo.findOrFail(params.id)
    if(auth.user.id !== todo.user_id){
      return response.route("todos.index")
    }
    return view.render("edit",{todo})
  }
  async update ({ params, request, response,session,auth }) {
    const todo = await Todo.findOrFail(params.id)
    if(auth.user.id !== todo.user_id){
      return response.route("todos.index")
    }
    todo.title=request.input('title')
    todo.completed=request.input("completed")==='on' ? true : false
    await todo.save()
    session.flash({successMessage:"Güncellendi"})
    return response.route('todos.index')
  }
  async destroy ({ params, auth, response,session }) {
    const todo = await Todo.findOrFail(params.id)
    if(auth.user.id !== todo.user_id){
      return response.route("todos.index")
    }
    await todo.delete()
    session.flash({successMessage:"Silindi"})
    return response.redirect('back')
  }
}

module.exports = TodoController