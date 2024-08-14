import mongoose from "mongoose";
import { genSalt , hash} from "bcrypt";

const UserSchema = mongoose.Schema({
    email : {
        type : String,
        required : [true , "Email Is Require"],
        unique : true,
    },
    password : {
        type : String,
        required : [true , "Password Is Require"],
    },
    firstname : {
        type : String,
        required : false,
    },
    lastname : {
        type : String,
        required : false,
    },
    image : {
        type : String,
        required : false,
    },
    color : {
        type : Number,
        required : false,
    },
    profilesetup : {
        type : Boolean,
        default : false
    },
});

UserSchema.pre("save",async function (next) {
    const salt = await genSalt();
    this.password = await hash(this.password,salt);
    next();
});

const User = mongoose.model("Users",UserSchema);

export default User;