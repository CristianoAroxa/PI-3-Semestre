import user from "../models/users.js"
import mongoose from "mongoose"

const User = mongoose.model("User", user)

class userService {
    Create(email, password) {
        const newUser = new User({
            email: email,
            password: password
        })
        newUser.save()
    }

    GetAll() {
        const users = User.find()
        return users
    }

    GetOne(email) {
        const user = User.findOne({ email: email })
        return user
    }
}

export default new userService()