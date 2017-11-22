var mongoose = require('mongoose');
var dictionary = mongoose.model('Word');

var sendJsonResponse = function(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.WordListById = function(req,res){
    dictionary
        .find()
        .exec(function(err, word) {
            if (!word) {
                sendJsonResponse(res, 404, {
                    "message": "words not found"}
                    );
                return;
            } else if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, word);
        });
}


module.exports.WordReadOne = function(req, res) {
    if (req.params && req.params.wordname) {
        dictionary
            .find(req.params.wordname)
            .exec(function(err, word) {
                console.log("where is");
                if (!word) {
                    sendJsonResponse(res, 404, {
                        "message": "word not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 404, err);
                    return;
                }
                sendJsonResponse(res, 200, word);
            });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No word in request"}
            );
    }
};

module.exports.WordCreate = function(req, res) {

    dictionary.create({

        name_Spanish: req.body.name_Spanish,
        name_Quechua: req.body.name_Quechua,
        name_English: req.body.name_English,
        name_mean: req.body.name_mean,
        kind_word: req.body.kind_word,
        category: req.body.category,
        level: req.body.level,

    }, function(err,word){
        if(err){
            console.log(err);
            sendJsonResponse(res,400,err);
        }else {
            console.log(word);
            sendJsonResponse(res,201,word);
        }
    });
};

module.exports.WordUpdateOne = function(req, res) {
    if (!req.params.wordname) {
        sendJsonResponse(res, 404, {
            "message": "Not found, wordname is required"}
            );
        return;
    }

   dictionary
        .find(req.params.wordname)
        .select('-comments')
        .exec(
            function(err, word) {
                if (!word) {
                    sendJsonResponse(res, 404, {
                        "message": "wordname not found"}
                        );
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                word.name_Spanish= req.body.name_Spanish;
                word.name_Quechua= req.body.name_Quechua;
                word.name_English= req.body.name_English;
                word.name_mean= req.body.name_mean;
                word.kind_word= req.body.kind_word;
                word.category= req.body.category;
                word.level= req.body.level;


                word.save(function(err, word) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                    } else {
                        sendJsonResponse(res, 200, word);
                    }
                });
        }
    );
};


module.exports.WordDeleteOne = function(req, res) {
    var wordname = req.params.wordname;

    if (wordname) {
       Blog
            .findByIdAndRemove(wordname)
            .exec(
                function(err, word) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, null);
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No word"}
            );
    }
};
