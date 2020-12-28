# User

Get information of Simple Twitter's User with GraphQL.

- [Schema](#schema)
- [Querys](#querys)
- [Mutations](#mutations)

---

## Schema

The User GraphQL Schema.

- `id` (_Int_)
- `name` (_String_)
- `followers` (_[User]_)
- `tweets` (_[Tweet]_)

---

## Querys

The User GraphQL Querys.

### users

GraphQL Query of get all Users.

**Arguments:**

1. none

**Returns**

- (_[User]_): User Array.

**Examples:**

```
query {
  users {
    id
  	name
  }
}
```

### user

GraphQL Query of get User by user ID.

**Arguments:**

1. id (_Int_): The user ID.

**Returns**

- (_User_): User.

**Examples:**

```
query {
  user(id: 1) {
    id
  	name
    followers {
      id
      name
    }
    tweets {
      id
      title
    }
  }
}
```

---

## Mutations

The User GraphQL Mutations.

### createUser

GraphQL Mutation of create User.

**Arguments:**

1. name (_String_): The new user's name.

**Returns**

- (_User_): User.

**Examples:**

```
mutation {
  createUser(name: "Peter Yi") {
    id
    name
  }
}
```

### addFollowerToUser

GraphQL Mutation add Follower to the User.

**Arguments:**

1. id (_Int_): The user ID.

2. followerUserId (_Int_): The follower's user ID.

**Returns**

- (_User_): User.

**Examples:**

```
mutation {
  addFollowerToUser(id: 1, followerUserId: 2) {
    id
    name
    followers {
      id
      name
    }
  }
}
```
