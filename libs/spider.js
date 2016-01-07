'use strict';
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var q = require('q');

var url = 'http://www.lindholmen.se/restauranger/';

function getResturang(resturang) {

    var deferred = q.defer();
    request(url + resturang, function(error, response, html) {
        var dishes = [];
        if (error) {
            deferred.reject(new Error(error));
        }
        var $ = cheerio.load(html);

        $('.dish-name').filter(function(){
          var data = $(this);
          dishes.push(data.text());
        });

        deferred.resolve(dishes);
    });
    return deferred.promise;
}

module.exports = {
    getResturang: getResturang
};
