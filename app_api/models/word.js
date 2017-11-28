var mongoose = require( 'mongoose' );

//Word for searching
var WordSchema = new mongoose.Schema({
    name_Spanish: { type: String, index:{unique:true}, required: true},
    name_Quechua: [{ type: String, required: true }],
    name_English: { type: String, required: true },
    name_mean:{type: String},
    kind_word:{type: String, required:true},
    category:{type:String, required:true},
    level:{type:Number,required:true}
});
/*
var CategorySchema= new moongoose.Schema({
    name_category:{type String, required:true},
    comments: [WordSchema]
});
*/
//mongoose.model('Category', CategorySchema);
mongoose.model('Word', WordSchema);
