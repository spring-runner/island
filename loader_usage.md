# Using `ImageLoader`
Create an `ImageLoader`
```js
var loader = new ImageLoader();
```
Load an image
```js
loader.load(path, callback);
```
View an entire image
```js
loader.load(path, function() {
  var image = loader.image();
});
```
> All `ImageLoader` methods for loading and getting images are slow. Images or `Spritesheet` objects should be stored in init scripts and then used in the game loop.

A way to call a function when an image loads.
```js
loader.load(path, function() {
  imageLoaded(loader.path(), loader.image());
});

function imageLoaded(path, img) {
  ...
}
```
> As shown in this example, `ImageLoader#path` gives you the path to the image that has been loaded

View part of an image
```js
// Load an image, then...
var section = loader.section(x, y, width, height);
```
View the contents of a spritesheet
```js
// Load an image, then...
var spritesheet = loader.spritesheet({
  rows: rows_in_the_spritesheet,
  cols: columns_in_the_spritesheet,
  gap: gaps_around_the_frames,
  border: padding_in_the_spritesheet
});
```
Get a frame of a spritesheet by index
```js
spritesheet.getFrameAtIndex(frame_index);
```
Get a frame of a spritesheet by position
```js
spritesheet.getFrameAt(frame_x, frame_y);
```
> `spritesheet#getFrameAt` calls `spritesheet#getFrameAtIndex` if it only recieves only one argument

# Example for many loading images
```js
function loadImages(paths, callback) {
  var images = {};
  for (var index = 0; index < path.length; index++) {
    loadImage(path[index], function () {
      if (Object.keys(images).length == paths.length) {
        callback(images);
      }
    });
  }
  function loadImage(callback) {
    loader.load(path, function() {
      saveImage(loader.path(), loader.image());
      callback();
    });
  }
  function saveImage(path, image) {
    images[path] = image;
  }
}
```
