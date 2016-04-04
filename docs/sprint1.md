# Sprint 1

## Overview

This sprint we will:
* focus on **Read**
* connect our _partially_ pre-built front-end to a back-end with hard-coded data.
* replace the hard-coded data with data stored in a mongo db


## Step 0:

Now would be a great time to explore the files provided for you.  In particular note:
* the html in public/index.html
* the incomplete server in server.js
* the included package.json

### Working through the lab

Use `nodemon` or `node server.js` throughout the exercise to run your server.  
Continually verify that your browser console is displaying the `app.js loaded!` message on document-ready.

## Step 1:
**Goal** display hard-coded data from `app.js` on `index.html`
Let's start on the outside and work our way in.  

1. Open `index.html` and find the HTML for an **album**. Convert this into a handlebars template.  Make sure you remove the data and place appropriate attributes in place instead.  (You can get those attributes from the array of objects provided in `app.js`)  Leave `div.albums` in place.

1. Open `app.js` and edit the function `renderAlbums` to display one Album on the page.
You should use HTML just like what you just deleted.  Build-up the HTML string and use jQuery to render it on the page.

1. Run the function on document-ready and give it `sampleAlbums[0]` (just one album).  Verify that the page looks right.

<details><summary>hint: calling renderAlbum</summary>

```js
$(document).ready(function() {
  console.log('app.js loaded!');
  renderAlbum(sampleAlbums[0]);
});
```
</details>


## Step 1.5: rendering all the albums

1. Update your code to use **all** the sampleAlbums.  Use the template's `#each` method.  Change the `renderAlbum` method to a `renderAlbums` method.  This way we can call one method to re-render all the album data.
  * Note that you'll need to pass the array of albums inside an object for the templating system to be able to use it.  That is your function call may need to look like `renderAlbums({albums: sampleAlbums});`


1. Later on we'll be clearing out the `div.albums` div.  This will unfortunately also remove the script tag holding our handlebars template.  Move that script down to the bottom of the document to preserve it.

At this point you should see all 4 hard-coded albums rendered on page.

<details><summary>Rendering all the albums with handlebars</summary>
```js
$(document).ready(function() {
  console.log('app.js loaded!');
  renderAlbums({albums: sampleAlbums});
});


// this function takes a single album and renders it to the page
function renderAlbums(albums) {
  console.log('rendering albums');
  var albumHtml = $('#album-template').html();
  var albumsTemplate = Handlebars.compile(albumHtml);
  var html = albumsTemplate(albums);
  $('#albums').prepend(html);
 }
```
</details>

## Step 2:

We're going to add the following _index_ route on our server:

```
GET /api/albums
```

1. Open server.js and create a new route for `/api/albums`

1. Serve the hard-coded albums in server.js on `/api/albums`.  This is an API route, so let's send JSON.

1. In `app.js`, use `ajax` to get the albums.  Render them on the page.

1. You can safely delete the hard-coded data in `app.js` now!

> The data in `server.js` and `app.js` is different; making it easy to see which data is being rendered on your page.


## Step 3:

Let's setup the database now.

1. Use `npm` to install `mongoose`.

1. In `models/album.js` add a model for our albums.  You should be able to determine the datatypes based on the sample data in the server.

1. Export Album in `models/album.js`

1. Require and export Album in `models/index.js`


<details><summary>hint: `models/albums.js`</summary>

```js
//models/album.js
var AlbumSchema = new Schema({
  artistName: String,
  name: String,
  releaseDate: String,
  genres: [ String ]
});

var Album = mongoose.model('Album', AlbumSchema);

module.exports = Album;
```

</details>

<details><summary>hint: `models/index.js`</summary>

```js
module.exports.Album = require("./album.js");
```

</details>


## Step 4

Let's try seeding our database.

1. Move the hard-coded model data from `server.js` into `seed.js`.  You'll note there's already an empty variable there for you to use.  

1. Strip out the pre-coded `_id` properties, mongo will take of creating these for us.

1. Make sure `mongod` is running in a terminal.

1. Run node seed.js

1. Resolve any errors you encounter.

<details><summary>hint: `error connect ECONNREFUSED`</summary>
If you see an error like:

```
process.nextTick(function() { throw err; })
                              ^
Error: connect ECONNREFUSED 127.0.0.1:27017
```

It usually means that `mongod` is not running.
</details>


## Step 5:

Now that the database is seeded, let's continue and use it in our `/api/albums` route.

1. Require `./models` in `server.js`.

1. Edit the current `app.get('/api/albums', fun...` to access the database and pull all albums.

1. Verify that you're getting the right data on your index page now.  Your ajax should still work; but if the `keys` in the data have changed at all you'll have to resolve that.

<details><summary>hint: requiring `./models`</summary>

```js
var db = require('./models');
```
</details>

## Sprint 1 Conclusion

**If you're stuck, take a look at the solutions branch**

If you've made it this far then we've created an API that has an index route `/api/albums`.
Our app has a single-page view that makes an ajax GET request to the API and renders the information.  Our data is being **R**ead from the database by the server.

We've completed the **Read** component of our **CRUD** app for the moment.

**Good job!**
