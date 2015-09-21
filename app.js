var Slack = require('slackbots');

var settings = {
    token: 'xoxb-11088318610-XasytLCPgwYUI2CBrpgp9SQx',
    name: 'anna'
}
var bot = new Slack(settings);
var counter = 0;
var scoreBoard = [];
var leet = {
}

bot.on('start', function() {
    console.log('Connected!');
    console.log(this);

});

bot.on('message', function(message) {
    var trigger = '!';
    if (message.type == 'message' && message.text.indexOf(trigger) === 0) {
        var listOfLeets = [];
        if (message.text === '!1337') {
            bot.postMessageToChannel('testing', 'LEEET MATE');
            
          
            var time = new Date();
            var hours = time.getHours();
            var mins = time.getMinutes();
            var clock;
            mins.toString().length < 1 ? clock = hours + ':' + 0 + mins : clock = hours + ':' + mins;

            if (clock.toString() == '23:32') {
                console.log('well done!');
                counter++;
                leet.user = message.user;
                leet.counter = counter;
                scoreBoard.push(leet);
                console.log(scoreBoard);
        };
        var user = this.users.filter(function(o){
            if (o.id === message.user) {
                return o;
            };
        });
        ;
        var userName;
        bot.getUser(user[0].name).then(function(data){
            bot.postMessageToChannel('testing','bra joobat! ' + user[0].name);  
            userName = data.name;
        });
    };
});

function getScoreBoard() {
    scoreBoard.sort(function(a,b){
        return a.score - b.score;
    });
}
