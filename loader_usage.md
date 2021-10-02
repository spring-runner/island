# Using `ImageLoader`
Create an `ImageLoader`
```js
var loader = new ImageLoader();
```
Load an image
```js
loader.load(path);
```
View an entire image
```js
var image = loader.image();
```
`ImageLoader#load()` returns itself so you can do...
```js
loader.load(path).image();
```
> All `ImageLoader` methods for loading and getting images are slow. Images or `Spritesheet` objects should be stored in init scripts and then used in the game loop.

View part of an image
```js
var section = loader.section(x, y, width, height);
```
View the contents of a spritesheet
```js
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
