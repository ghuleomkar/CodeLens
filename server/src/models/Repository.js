const mongoose = require("mongoose");

const repositorySchema = new mongoose.Schema(
    {
        githubUrl:{
            type: String,
            required: true,
            trim: true,
            unique:true,
        },

        owner:{
            type: String,
            required: true,
        },
        name:{
            type:String,
            required:true,
        },
        description:{
            type:String,
            default:"",
        },
        language:{
            type:String,
            default:"Unknown",
        },
        stars:{
            type:Number,
            default:0,
        },
        forks:{
            type:Number,
            default:0,
        },
        defaultBranch:{
            type:String,
            default:"main",
        },
        isPrivate:{
            type:Boolean,
            default:false,
        },
        analyzed:{
            type:Boolean,
            default:false,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Repository", repositorySchema);