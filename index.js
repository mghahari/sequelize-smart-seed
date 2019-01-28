async function smartSeed(model, data, overwrite = true, keys = ['id']) {
  var dbData = await model.unscoped().findAll()
  var create = []
  var update = []
  data.forEach((item) => {
    var finded = false
    for(var i = 0, dbItem; dbItem = dbData[i]; i++) {
      if(equals(item, dbItem, keys)) {
        finded = true
        if(overwrite && changed(item, dbItem)) {
          update.push(item)
        }
      }
    }
    if(!finded) {
      create.push(item)
    }
  })

  for(var i = 0; item = create[i]; i++) {
    await model.create(item)
  }

  if(overwrite) {
    for(var i = 0; item = update[i]; i++) {
      var where = generateWhere(item, keys)
      await model.update(item, {
        where: where
      })
    }
  }
}

function changed(item, dbItem) {
  for(var property in item) {
    if(item[property] != dbItem[property]) {
      return true
    }
  }
  return false
}

function equals(item, dbItem, keys) {
  for(var i = 0, key; key = keys[i]; i++) {
    if(item[key] != dbItem[key])
      return false
  }
  return true
}

function generateWhere(item, keys) {
  var where = {}
  for(var i = 0, key; key = keys[i]; i++) {
    where[key] = item[key]
  }
  return where
}

module.exports = smartSeed
