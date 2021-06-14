var Twit = require('twit');
const config = require("../config/auth");

exports.getTweet = (req, res) => {
    const { keyword1, keyword2, count } = req.query;
    console.log(keyword1, keyword2, count)
    var T = new Twit({
        consumer_key: config.consumer_key,
        consumer_secret: config.consumer_secret,
        access_token: config.access_token,
        access_token_secret: config.access_token_secret,
        //timeout_ms: 60 * 1000,  // optional HTTP request timeout to apply to all requests.
        //strictSSL: true,     // optional - requires SSL certificates to be valid.
    })

    T.get('search/tweets',
        { q: `${keyword1} ${keyword2}`, count: count, lang: 'fr', exclude_replies: true, tweet_mode: 'extended' },
        function (err, data, response) {
            return res.json({
                status: true,
                data: data,
                err: err,
                response: response
            })
        })
    console.log('sortie');
    return res.json({
        status: false,
        twit: Twit
    })
};