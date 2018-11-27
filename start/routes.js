'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get("/",async({response})=>{
    return response.redirect("/todos")
})

Route.group(() => {
    Route.get('/login','AuthController.index').as("auth.index")
    Route.get('/register','AuthController.index').as("auth.index")    
    Route.post('/login','AuthController.login').as("auth.login")
    Route.post('/register','AuthController.register').as("auth.register").validator("Auth")
}).middleware(['guest'])
Route.group(() => {
    Route.get('/todos','TodoController.index').as("todos.index")
    Route.post('/todos','TodoController.store').as("todos.store").validator("StoreTodo")
    Route.get('/todos/:id/edit','TodoController.edit').as("todos.edit")
    Route.patch('/todos/:id','TodoController.update').as("todos.update").validator("StoreTodo")
    Route.delete('/todos/:id','TodoController.destroy').as("todos.destroy")
    Route.post('/logout','AuthController.logout').as("auth.logout")
}).middleware(['auth'])