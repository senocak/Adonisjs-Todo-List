'use strict'

class Auth {
  get rules () {
    return {
      email : "required|email|unique:users",
      password : "required|min:5|confirmed"
    }
  }
  get messages () {
    return { 
      "email.required"  :"Email Alanı Gerekli",
      "email.email"     :"Email Formatında Olmalı",
      "email.unique"    :"Email Zaten Kayıtlı",
      "password.required"  :"Şifre Alanı Gerekli",
      "password.min"       :"Şifre En Az 5 Karakter Uzunluğunda Olmalıdır",
      "password.confirmed" :"Şifre Alanları Birbirileri İle Aynı Olmalıdır",
    }
  }
}
module.exports = Auth