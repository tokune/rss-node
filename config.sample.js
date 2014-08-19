module.exports = {             
    sessionSecret : 'tokune',
    dev_mode      : true,
    title         : 'Tokune Rss Collector',
    port          : 7623,
    mysql         : {
        database : "rss",
        protocol : "mysql",
        host     : "localhost",
        user     : "root",
        password : "pwd",
        query    : { pool : true }
    }
}
