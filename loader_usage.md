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
Get a frame of a spritesheet
```js
spritesheet[frame_number]
```
Compact version
```js
loader.load(path).image();
```
