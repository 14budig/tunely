


var db = require('../models');


function create (req, res){
  var newSong = new db.Song(req.body);
  var albumId = req.params.albumId;
  db.Album.findOne({_id: albumId}, function(err, album){
    if(err){
      return console.log(err);
    }
    console.log(album);
    console.log(album.songs);
    album.songs.push(newSong);
    album.save(function(err, album){
      if (err){
        return console.log(err);
      }
       res.json(album);
     })
  });
}

module.exports = {
  create: create
};
