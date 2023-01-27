----
Initial Node JS / MongoDB setup
Express Server setup
Creation of middleware, utilization of third party middlewares

Setup Shared MongoDB Database


Working with Mongoose
- Using an ORM to do data modeling
- Creating a User, and Note Model
- Usage of `mongoose-sequence` npm package for sequential uuid in a sequence

```
noteSchema.plugin(AutoIncrement, {
  inc_field: "ticket",
  id: "ticketNums",
  start_seq: 500
})
```