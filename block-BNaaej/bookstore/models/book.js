var mongoose=require('mongoose');
var Schema=mongoose.Schema;


var bookSchema=new Schema({
    title:{type:String,required:true},
    summary:{type:String,required:true},
    pages:Number,
    publication:String,
    cover_image:String,
    categoryName:[{type:String,required:true}],
    categoryId:[{type: Schema.Types.ObjectId,required:true,ref:'Category'}],
    authorName:{type:String,required:true},
    authorId:[{type:Schema.Types.ObjectId,required:true,ref:'Author'}],

})

module.exports=mongoose.model('Book',bookSchema);