// find one province by code
db.getCollection('provinces').find({ 'code': '11' }, { _id: 0, 'districts': 0 })

// find provinces by name case-insensitive
var name = 'สมุทร';
db.getCollection('provinces').find({ 'name': new RegExp('\.*' + name + '\.', 'i') }, { _id: 0, 'districts': 0 })

// find districts by code
db.getCollection('provinces').aggregate([ 
    { $match: { 'districts.code': '1105' } },
    { $project: { 'districts.code': 1, 'districts.name': 1 } }
])

// find districts by name
var name = 'กรุง';
db.getCollection('provinces').aggregate([ 
    { $match: { 'districts.name': new RegExp('\.*' + name + '\.', 'i') } },
    { $project: { 'districts.code': 1, 'districts.name': 1 } }
])

// find sub-districts by code

// find sub-districts by name
