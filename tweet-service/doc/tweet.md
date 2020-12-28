# Tweet

Get information of Simple Twitter's Tweet with GraphQL.

- [Schema](#schema)
- [Querys](#querys)
- [Mutations](#mutations)

---

## Schema

The Tweet GraphQL Schema.

- `id` (_Int_)
- `title` (_String_)
- `content` (_String_)
- `user` (_[User]_)

---

## Querys

The Tweet GraphQL Querys.

### tweets

GraphQL Query of get Tweets by user ID.

**Arguments:**

1. none

**Returns**

- (_[Tweet]_): Tweet Array.

**Examples:**

```
query {
  tweets(userId: 1) {
    id
    title
    content
  }
}
```

---

## Mutations

The Tweet GraphQL Mutations.

### createTweet

GraphQL Mutation of create Tweet.

**Arguments:**

1. userId (_String_): The user ID of the user who created the new Tweet.

2. title (_String_): The new Tweet's title.

3. content (_String_): The new Tweet's content.

**Returns**

- (_Tweet_): Tweet.

**Examples:**

```
mutation {
  createTweet(userId: 1, title: "My First Tweet", content: "blah blah blah...") {
    id
    title
    content
  }
}
```
