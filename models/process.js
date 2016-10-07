var mongoose = require("mongoose");

var processSchema = mongoose.Schema({
    name: { type:String, required: true, unique: true },
    description: String,
    fingerprint: Boolean,
    role: { type: Number, required: true }//1-4, 1->user, 2->client, 3->employee, 4->admin
});

var Process = mongoose.model("Process", processSchema);
module.exports = Process;