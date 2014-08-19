var orm = require("orm");
var config = require("../config");

var db = orm.connect(config.mysql);

var Feed = exports.Feed = db.define("feeds", {
    feed_id : {type:"number", key:true},
    site_id: Number,
    title: String,
    content: String,
    link: String,
    uid: String,
    created_at: { type: "date", time: true}
});

var Site = exports.Site = db.define("sites", {
    site_id: {type:"number", key:true},
    title: String,
    link: String,
});
