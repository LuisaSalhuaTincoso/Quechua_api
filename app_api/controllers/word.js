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

module.exports.WordListByCategory = function(req,res){
    dictionary
        .find({category:req.params.categoryname})
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
    if (req.params.wordname) {
        dictionary
            .find({name_Spanish:req.params.wordname})
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
        .find({name_Spanish:req.params.wordname})
        .select('-comments')
        .exec(
            function(err, word) {
                if (!word) {
                    sendJsonResponse(res, 404, {"message": "wordname not found"});
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                word[0].name_Spanish= req.body.name_Spanish;
                word[0].name_Quechua= req.body.name_Quechua;
                word[0].name_English= req.body.name_English;
                word[0].name_mean= req.body.name_mean;
                word[0].kind_word= req.body.kind_word;
                word[0].category= req.body.category;
                word[0].level= req.body.level;
                console.log(word[0]);
                word[0].save(function(err, word) {
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
    var wordname =req.params.wordname;

    if (wordname) {
       dictionary
            .remove({name_Spanish:req.params.wordname})
            .exec(
                function(err, word) {
                    if (err) {
                        sendJsonResponse(res, 404, err);
                        return;
                    }
                    sendJsonResponse(res, 204, "Palabra eliminada");
                }
            );
    } else {
        sendJsonResponse(res, 404, {
            "message": "No word"}
            );
    }
};
