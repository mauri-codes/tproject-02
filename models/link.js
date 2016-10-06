var mongoose = require("mongoose");

var linkSchema = mongoose.Schema({
    linkID: { type:String, required: true, unique: true },
    username: { type: String, required: true},
    status: { type: String, required: true},//Done, WaitingF, FingerprintConfirmed
    date: {type: Date, default: Date.now()},
    processName: String
});

console.log("hello world connection");

var Link = mongoose.model("Link", linkSchema);
module.exports = Link;