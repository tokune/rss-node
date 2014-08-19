var config = require('../config');
var async = require('async');
var models = require('./models'),
    Feed = models.Feed,
    Site = models.Site;

exports.route = function(app) {
    app.get('/', function(req, res) {
        var ctx = {};

        async.waterfall([
            function(next) {
                Site.find({}, next);
            },
            function(sites, next) {
                ctx.sites = sites;
                Feed.find({}, { offset: 0 }, 50, next);
            },
        ], function(err, feeds) {
            res.render('index', {sites:ctx.sites, feeds:feeds, title: config.title});
        });
    });

    app.get('/data/site/:site_id', function(req, res) {
        var site_id = req.param('site_id');
        var page = req.param('page') || 1;
        var perpage = 50;
        var queries = {};
        if (site_id) 
            queries.site_id = site_id;
        
        Feed.find(queries, { offset: (page-1) * perpage }, perpage, ['created_at', 'Z'], function(err, feeds) {
            if (err) return res.json({err:err});
            res.json(feeds);
        });
    });

    app.get('/feed/', function(req, res) {
        res.render('feed');
    });

    app.get('/site', function(req, res) {
        res.render('site');
    });
};
