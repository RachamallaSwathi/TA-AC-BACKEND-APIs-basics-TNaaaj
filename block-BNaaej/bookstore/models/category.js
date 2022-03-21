var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var categorySchema=new Schema({
    category:{type:String,required:true},
    booksId:[{type:Schema.Types.ObjectId,required:true,ref:'Book'}]
},{timestamps:true})


module.exports=mongoose.model('Category',categorySchema);