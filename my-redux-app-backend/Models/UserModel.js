import mongoose from "mongoose";

const user = new mongoose.Schema ({
    firstName:{ 
    type:String,
    required: true
    },
    LastName:{
        type: String,
        required: true
    },
    Phone:{
        type: Number,
        required: true
    },
    Email:{
        type : String,
        required : true,
        unique : true
        
    },
    Age:{
        type : String,
        required: true
    },
    Subcription:{
        type : Boolean,
        
    },
    Password:{
        type: String,
        required : true
    },

});

export default user;
