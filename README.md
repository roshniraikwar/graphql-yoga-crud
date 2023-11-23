mutation {
  postLink(url: "www.prisma.io", description: "Prisma replaces traditional ORMs") {
    id
  }
}

query {
  feed {
    id
    url
    description
  }
}

mutation {
  createUser(name:"roshni", email: "roshni97@gmail.com", password:"roshni@123") {
    id
  }
}

query {
  userList {
    id
    name
    email
    password
  }
}

mutation {
  editUser(id:1,name:"roshni", email: "roshni97@gmail.com", password:"roshni@123") {
    id
  }
}

mutation {
  deleteUser(id:1) {
    id
  }
}
