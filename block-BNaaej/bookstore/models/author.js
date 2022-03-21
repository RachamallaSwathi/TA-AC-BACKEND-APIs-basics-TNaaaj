var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var authorSchema=new Schema({
    authorName:{type:String,required:true},
    email:String,
    country:String,
    booksId:[{type:Schema.Types.ObjectId,required:true,ref:'Book'}]
})


module.exports=mongoose.model('Author',authorSchema);