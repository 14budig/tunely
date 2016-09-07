/* CLIENT-SIDE JS
 *
 * You may edit this file as you see fit.  Try to separate different components
 * into functions and objects as needed.
 *
 */


$(document).ready(function() {
  console.log('app.js loaded!');

  $.ajax({
    method: 'GET',
    url: '/api/albums',
    success: renderMultipleAlbums
  });

  $('#album-form form').on('submit', function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    console.log('formData', formData);
    $.post('/api/albums', formData, function(album) {
      console.log('album after POST', album);
      renderAlbum(album);  //render the server's response
    });
    $(this).trigger("reset");
  });

    $('#albums').on('click', '.add-song', function(event){
      event.preventDefault();
      var id= $(this).closest('.album').data('album-id');
      $('#songModal').data('album-id', id);
      console.log('id',id);
      $('#songModal').modal();
    });

    $('#saveSong').on('click', function handleNewSongSubmit(e) {
    e.preventDefault();
    // get data from modal fields
    // get album ID
    // POST to SERVER
    // clear form
    // close modal
    // update the correct album to show the new song
    var albumId = $('#songModal').data('album-id');
    console.log(albumId);
    var url = '/api/albums/'+ albumId + '/songs/';
  });
});

function renderMultipleAlbums(albums) {
  albums.forEach(function(album) {
    renderAlbum(album);
  });
}

function renderAlbum(album) {
  console.log('rendering album', album);
  var albumHtml = $('#album-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(album);
  $('#albums').prepend(html);
}
