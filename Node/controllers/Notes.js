const notesSchema = require('../lib/schema/Notes')

const GetNote = async (noteObj) => {
    return (await (notesSchema.findOne(noteObj)))
}

const GetAllNote = async (noteObj) => {
    return (await (notesSchema.find(noteObj)))
}

const CreateNote = async (noteObj) => {
    return (await (notesSchema.create(noteObj)))
}

const UpdateNotes = async (noteObj) => {
    return (await (notesSchema.findOneAndUpdate(noteObj)))
}

const DeleteNote = async (noteObj) => {
    return (await (notesSchema.deleteOne(noteObj)))
}

module.exports = {
    GetNote,
    CreateNote,
    UpdateNotes,
    DeleteNote,
    GetAllNote
}