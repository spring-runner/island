# Using `ImageLoader`
Create an `ImageLoader`
```cs
var loader = new ImageLoader();
```
Load an image
```cs
loader.load(path);
```
View an entire image
```cs
var image = loader.image();
```
View part of an image image
```cs
var section = loader.section(x, y, width, height);
```
View the contents of a spritesheet
```cs
var spritesheet = loader.spritesheet({
  rows: rows_in_the_spritesheet,
  cols: columns_in_the_spritesheet,
  gap: gaps_around_the_frames
  border: padding_in_the_spritesheet
});
```
Get a frame of a spritesheet
```cs
spritesheet[frame_number]
```
Compact version
```cs
loader.load(path).image();
```
