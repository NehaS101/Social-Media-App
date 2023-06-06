 1.endpoint:localhost:8300/
  method:GET
  purpose:home endpoint
  response:Welcome to Social Media App


  2.endpoint:localhost:8300/api/register
  method:POST
  purpose:This endpoint should allow users to register. Hash the password on store.
  response:user registered successfully
  status:201


  3.endpoint:localhost:8300/api/login
  method:POST
  purpose:This endpoint should allow users to login. Return JWT token on successful login.
  response:  {
  "Message": "Login successful",
  "Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDdlZWE5MDU5YWViNWFhZWU2ZWY3MWMiLCJpYXQiOjE2ODYwNDQxMzIsImV4cCI6MTY4NjY0ODkzMn0.KrZHr6iPxaXlCT6sifxdmkZi-nan4SdpfofPtBJgHi8",
  "Data": {
    "_id": "647eea9059aeb5aaee6ef71c",
    "name": "neha",
    "email": "neha@gmail.com",
    "password": "$2b$06$iFKAdMVUgtp5UaDyPvXxPePKafUPa3Lu7bpA13UWAaXMQuCNikr8C",
    "dob": "2002-07-09T18:30:00.000Z",
    "bio": "I'm intelligent",
    "posts": [],
    "friends": [
      "647eebac15b6a23120f65714"
    ],
    "friendRequests": [],
    "__v": 1
  }
  }
  status:201


  4.endpoint:localhost:8300/api/users
  method:GET
  purpose:This endpoint should return a list of all registered users
  response:{
  "mssg": "all users details",
  "data": [
    {
      "_id": "647eea9059aeb5aaee6ef71c",
      "name": "neha",
      "email": "neha@gmail.com",
      "password": "$2b$06$iFKAdMVUgtp5UaDyPvXxPePKafUPa3Lu7bpA13UWAaXMQuCNikr8C",
      "dob": "2002-07-09T18:30:00.000Z",
      "bio": "I'm intelligent",
      "posts": [],
      "friends": [
        "647eebac15b6a23120f65714"
      ],
      "friendRequests": [],
      "__v": 1
    },
    {
      "_id": "647eebac15b6a23120f65714",
      "name": "suchi",
      "email": "suchi@gmail.com",
      "password": "$2b$06$gwfX9ducrgKXv4iM50MkougJlEIU3pqm2TSihrI7V6Wd/s4KU.j2K",
      "dob": "2003-11-06T18:30:00.000Z",
      "bio": "poor guy",
      "posts": [],
      "friends": [
        "647eea9059aeb5aaee6ef71c"
      ],
      "friendRequests": [
        "647eea9059aeb5aaee6ef71c"
      ],
      "__v": 2
    }
  ]
}
  status:200


  5.endpoint:localhost:8300/api/users/:id/friends
  method:GET
  purpose:This endpoint should return a list of all friends of a specific user identified by its ID
  response:[
  {
    "_id": "647eebac15b6a23120f65714",
    "name": "suchi",
    "email": "suchi@gmail.com",
    "password": "$2b$06$gwfX9ducrgKXv4iM50MkougJlEIU3pqm2TSihrI7V6Wd/s4KU.j2K",
    "dob": "2003-11-06T18:30:00.000Z",
    "bio": "poor guy",
    "posts": [],
    "friends": [
      "647eea9059aeb5aaee6ef71c"
    ],
    "friendRequests": [
      "647eea9059aeb5aaee6ef71c"
    ],
    "__v": 2
  }
]
  status:201

  6.endpoint:localhost:8300/api/users/:id/friends
  method:POST
  purpose:This endpoint should allow the user to send a friend request to another user identified by its ID.
  response:{ message: 'Friend request sent successfully' }
  status:201


  7.endpoint:localhost:8300/api/users/:id/friends/:friendid
  method:PUT
  purpose:This endpoint should allow users to accept or reject friend requests sent to them by another user identified by its ID
  response:Friend request updated successfully
  status:204


  8.endpoint:localhost:8300/api/posts
  method:GET
  purpose:This endpoint should return a list of all posts.
  response:{ mssg: "all posts", data: data }
  status:200


  9.endpoint:localhost:8300/api/posts
  method:POST
  purpose:This endpoint should allow the user to create a new post.
  response:{post}
  status:201


  10.endpoint:localhost:8300/api/posts/647ef8782aa6f3b446f2f16a
  method:PUT
  purpose:This endpoint should allow users to update the text or image of a specific post identified by its ID.
  response:{
  "mssg": "post updated successfully",
  "post": {
    "_id": "647ef8782aa6f3b446f2f16a",
    "user": "647eea9059aeb5aaee6ef71c",
    "text": "looking beautiful",
    "image": "image.png",
    "likes": [],
    "comments": [],
    "__v": 0
  }
}
  status:204

  11.endpoint:localhost:8300/api/posts/647ef8782aa6f3b446f2f16a
  method:DELETE
  purpose:This endpoint should allow users to delete a specific post identified by its ID
  response:{
    mssg:"delete deleted successfully"
  }
  status:202