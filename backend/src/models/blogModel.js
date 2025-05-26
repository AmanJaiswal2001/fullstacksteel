const mongoose=require('mongoose');


const contentItemSchema=new mongoose.Schema({
type:{type:String,required:true},

text:String,
items:[String],


});

const blogContents=new mongoose.Schema({
    content:[contentItemSchema],

    banerImage:{type:String ,
        //  required:true
        },
    sideImage:{type:String,
        // required:true
    }
});


module.exports = mongoose.models.HotRollingContent ||
  mongoose.model('blog', blogContents);