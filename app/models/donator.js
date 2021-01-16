const bookshelf=require('../data/db-config')
//Models
const Donator=bookshelf.model('Donator',{
    tableName:'donators',    
})
module.exports=Donator