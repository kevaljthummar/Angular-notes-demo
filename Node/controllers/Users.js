const usersSchema = require('../lib/schema/Users');

const GetAllUsers = async () => {
    return (await (usersSchema.find()))
}

const GetUser = async (userObj) => {
    return (await (usersSchema.findOne(userObj)))
}

const CreateUser = async (userObj) => {
    return (await (usersSchema.create(userObj)))
}

const DeleteUser = async (userObj) => {
    return (await (usersSchema.deleteOne(userObj)))
}

module.exports = {
    GetAllUsers,
    GetUser,
    CreateUser,
    DeleteUser
}
