const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  let username=req.body.username
  let password=req.body.password
  if(username=="" || password==""){
      return res.send("fill in username and password")
  }else if(users.some(e=>e.username==username)){
      return res.send("username already exists")
  }else{
    users.push({username:username,
    password:password})
    return res.send("Customer registered")
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    let promise = new Promise((resolve,reject)=>{
        resolve("done")
    })
    promise.then((message)=>{
        return res.json(JSON.parse(JSON.stringify(books)))
    })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let ISBN=req.params.isbn
  let promise = new Promise((resolve,reject)=>{
    resolve("done")
})
    promise.then((message)=>{
        console.log(message)
    return res.json(JSON.parse(JSON.stringify(books[ISBN])))
})
  
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author=req.params.author
  let promise = new Promise((resolve,reject)=>{
    resolve("done")
    })
    promise.then((message)=>{
        console.log(message)
        let result
        for (let i = 1; i < Object.keys(books).length; i++) {
            if(author==books[i].author){
                result=books[i]
            }
        }
        return res.json(result)
})
  
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    let title=req.params.title
    let result
    let promise = new Promise((resolve,reject)=>{
        resolve("done")
        })
        promise.then((message)=>{
            console.log(message)
            for (let i = 1; i < Object.keys(books).length; i++) {
                if(title==books[i].title){
                    result=books[i]
                }
            }
            return res.json(result)
    })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let ISBN=req.params.isbn
    return res.json(JSON.parse(JSON.stringify(books[ISBN].reviews)))
});

module.exports.general = public_users;
