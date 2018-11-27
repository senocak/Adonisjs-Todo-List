'use strict'
const User = use("App/Models/User")

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class AuthController {
  async index ({ view }) {
    return view.render("login")
  }
  async create ({ request, response, view }) {
  }
  async register ({ request, response,session }) {
    const user = await User.create({
      username:request.input("email"),
      email:request.input("email"),
      password:request.input("password")
    })
    session.flash({successMessage:"Kayıt Başarılı"})
    return response.route("auth.index")
  }
  async login ({ request, session, auth, response }) {
    await auth.attempt(request.input("login_email"),request.input("login_sifre"))
    session.flash({successMessage:"Giriş Başarılı"})
    return response.route("todos.index")
  }
  async edit ({ params, request, response, view }) {
  }
  async update ({ params, request, response }) {
  }
  async logout ({ params, auth, response }) {
    await auth.logout()
    return response.route("auth.index")
  }
}
module.exports = AuthController