# Smart Seed
## Usage
```
smartSeed(<Model>, <records>, ?['key1, key2', ...])
```
default value for keys is `id`

in seed up function:
```
- const smartSeed = require('sequelize-smart-seed)
- const Models = require('./models')

up: async function () {
  await smartSeed(Models.MyModel, [
    id: 1,
    name: "test",
    ...
  ],
  ...
  ,['id'])
}
```