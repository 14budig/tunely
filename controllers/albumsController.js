/************
 * DATABASE *
 ************/

var db = require('../models');



// GET /api/albums
function index(req, res) {
  db.Album.find({}, function(err, allAlbums) {
    res.json(allAlbums);
  });
}

function create(req, res) {
  console.log('body', req.body);

  // split at comma and remove and trailing space
  var genres = req.body.genres.split(',').map(function(item) { return item.trim(); } );
  req.body.genres = genres;

  db.Album.create(req.body, function(err, album) {
    if (err) { console.log('error', err); }
    console.log(album);
    res.json(album);
  });
}

function show(req, res) {
  // FILL ME IN !
}

function destroy(req, res) {
  console.log(req.params.albumId);
  db.Album.findOneAndRemove({_id: req.params.albumId}, function(err, album){
    if (err){
      return console.log(err);
    }
    res.json(album);
  });
  //res.status(200).send("Success");
}

function update(req, res) {
  // FILL ME IN !
}


// export public methods here
module.exports = {
  index: index,
  create: create,
  show: show,
  destroy: destroy,
  update: update
};
