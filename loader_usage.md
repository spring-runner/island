# Using `ImageLoader`
Load an image
```js
ImageLoader.load(path, function (image) {
  ...
});
```
View an entire image
```js
ImageLoader.load(path, function (img) {
  img.image();
});
```
> All `ImageLoader` methods for loading and getting images are slow. `Image`, `ImageLoader.Image` or `ImageLoader.Spritesheet` objects should be stored in init scripts and then used in the game loop.

A way to call a function when an image loads.
```js
ImageLoader.load(path, function (img) {
  imageLoaded(img.path(), img.image());
});

function imageLoaded(path, img) {
  ...
}
```
> As shown in this example, `ImageLoader.Image#path` gives you the path to the image that has been loaded

View part of an image
```js
ImageLoader.load(path, function (img) {
  img.section(x, y, width, height);
});
```
View the contents of a spritesheet
```js
// Load an image, then...
var spritesheet = img.spritesheet({
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
> `ImageLoader.Spritesheet#getFrameAt` calls `ImageLoader.Spritesheet#getFrameAtIndex` if it only recieves only one argument
