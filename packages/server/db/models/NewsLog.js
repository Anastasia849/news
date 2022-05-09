const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({ 
    date: { type: Date, required: true, default: Date.now },
    userId: {type:String, required: true},
    category: {type: String, required: true},
    source :{type:String, required:false},
    url: {type: String, required: true}
});

const NewsLog = mongoose.model("news_log", logSchema);

module.exports = NewsLog;