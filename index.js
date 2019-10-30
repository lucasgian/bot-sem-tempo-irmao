const SlackBot = require('slackbots');
const axios = require('axios')
const pingmydyno = require('pingmydyno');
require('dotenv').config();

const bot = new SlackBot({
    token: 'xoxb-805418037462-804742825073-5ha7CfqEkaHYNFm3CJaYPKol',
    name: 'Sem tempo irmão'
})

// Start Handler
bot.on('start', () => {
    const params = {
        icon_emoji: ':robot_face:'
    }

    bot.postMessageToChannel(
        'random',
        'Tá na hora do KO @semtempoirmao',
        params
    );
})

// Error Handler
bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text);
})

// Response Handler
function handleMessage(message) {
    if(message.includes(' ko')) {
        inspireMe()
    } else if(message.includes(' random joke')) {
        randomJoke()
    } else if(message.includes(' help')) {
        runHelp()
    }
}

// inspire Me
function inspireMe() {
    //axios.get('https://raw.githubusercontent.com/BolajiAyodeji/semtempoirmao/master/src/quotes.json')
    axios.get('https://node-gif.herokuapp.com/v1/bots/phrases/feeds')
        .then(res => {
            const quote = res.data.content;
            const author = res.data.author || 'Bruno';
            const params = {
                //icon_emoji: ':male-technologist:'
                icon_emoji: ':meow_party:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:meow_party: ${quote} - *${author}*`,
                params
            );

      })
}

// Random Joke
function randomJoke() {
    axios.get('https://api.chucknorris.io/jokes/random')
      .then(res => {
            const joke = res.data.value;

            const params = {
                icon_emoji: ':smile:'
            }
        
            bot.postMessageToChannel(
                'random',
                `:zap: ${joke}`,
                params
            );

      })
}

// Show Help
function runHelp() {
    const params = {
        icon_emoji: ':question:'
    }

    bot.postMessageToChannel(
        'random',
        `Type *@semtempoirmao* with *inspire me* to get an inspiring techie quote, *random joke* to get a Chuck Norris random joke and *help* to get this instruction again`,
        params
    );
}


// Slack App directory submission 302 server
const http = require('http');
const fs = require('fs');
 
http.createServer(function (req, res) {
    
    if (req.url == '/') {
        res.writeHead(302, { "Location": "https://" + 'slack.com' });
        return res.end();
    } else {
        fs.readFile(req.url.substring(1),
            function(err, data) { 
                if (err) throw err;
                res.writeHead(200);
                res.write(data.toString('utf8'));
                return res.end();
        });
    } 
}).listen('3000', () => {
    pingmydyno('https://myapp.herokuapp.com');
});
