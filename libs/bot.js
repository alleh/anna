'use strict';

var _ = require('lodash');
var util = require('util');
var path = require('path');
var fs = require('fs');
var slackbots = require('slackbots');
var mongoose = require('mongoose');
var scraper = require('./spider.js');
var data = require('../data.json');


var Bot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'Anna';
    this.user = null;

};
util.inherits(Bot, slackbots);

Bot.prototype.run = function () {
    Bot.super_.call(this, this.settings);
    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

Bot.prototype._onStart = function () {
    this._loadBotUser();
};

Bot.prototype._onMessage = function (message) {
    if (this._isCommand(message.text)) {
        this._runCommand(message);
    }
};

Bot.prototype._loadBotUser = function () {
    var self = this;
    this.user = this.users.filter(function (user) {
        return user.name === self.name;
    })[0];
};

Bot.prototype._isCommand = function(message) {
    return _.startsWith(message, '!', 0);
};
Bot.prototype._showLunch = function(resturang, id){
    var _that = this;
    var user = this.users.filter(function (user) {
        return user.id === id;
    })[0];
    var userId = this.getUser(user.name);

    scraper.getResturang(resturang).then(function(data){
        if (!data.length > 0 ) {
            _that.postMessageToUser(user.name, 'Hittade inget! Förmodligen är det helg.. ');
        } else {
			var response = "*Dagens lunch på " + resturang.split('-').join(' ') + ":* \n"
            for (var meal in data) {
				response += "- " + data[meal] + "\n";
            }
			_that.postMessageToUser(user.name, response);
        }

    }), function(err){
        console.log(err);
    };
};

Bot.prototype._lunchRoulette = function() {
    return _.sample(data.resturants);
}
Bot.prototype._runCommand = function(command){

    switch (command.text.slice(1).toLowerCase()) {
        case "kooperativet":
        case "koop":
            this._showLunch('kooperativet', command.user);
            break;
        case "matminnen":
            this._showLunch('matminnen',command.user);
            break;
        case "svt":
            this._showLunch('restaurang-tableau-tv-och-radiohuset',command.user);
            break;
        case "bistrot":
            this._showLunch('bistrot',command.user);
            break;
		case "mimolett":
			this._showLunch('Mimolett', command.user);
			break;
		case "pir11":
			this._showLunch('pir-11-ericsson-huset', command.user);
			break;
		case "food-roulette":
            var random = this._lunchRoulette();
			this.postMessageToUser(command.user.name, random);
            break;
    }
}

module.exports = Bot;
