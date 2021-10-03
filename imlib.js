const imageLibrary = {
  "gull" : {
    "file" : "Assets/Gull.png",
    "width" : 24,
    "height" : 24,
    "num_across" : 2,
    "num_down" : 3,
    "gap" : 0,  // May omit if zero
 },

 "trees" : {
   "file" : "Assets/trees.png",
   "width" : 24,
   "height" : 24,
   "num_across" : 2,
   "num_down" : 2,
 },

 "player" : {
   "file" : "Assets/player.png",
   "width" : 18,
   "height" : 10,
   "num_across" : 2,
   "num_down" : 4,
 },

 "rail" : {
   "file" : "Assets/railing.png",
   "width" : 24,
   "height" : 24,
   "num_across" : 4,
   "num_down" : 4,
 },

 "wave" : {
   "file" : "Assets/waves.png",
   "width" : 24,
   "height" : 12,
   "num_across" : 1,
   "num_down" : 1,
 }
};

function initImlib() {
  for (var name in imageLibrary) {
    var data = imageLibrary[name];

    var img = new Image();
    img.src = data.file;
    imageLibrary[name].img = img;
  }
}

function drawImage(context, image_name, x, y) {
  var image = imageLibrary[image_name];
  context.drawImage(image.img, x, y)
}

function drawSprite(context, image_name, frame_num, x, y) {
  var image = imageLibrary[image_name];
  var down_num = Math.floor(frame_num / image.num_across);
  var across_num = frame_num % image.num_across;
  var sx = image.width * across_num + (image.gap | 0) * Math.max(0, across_num - 1);
  var sy = image.height * down_num; + (image.gap | 0) * Math.max(0, down_num - 1);
  context.drawImage(image.img,
    sx, sy, image.width, image.height,
    x, y, image.width, image.height);
}

function drawCenteredSprite(context, image_name, frame_num, x, y, angle) {
  var image = imageLibrary[image_name];
  var down_num = Math.floor(frame_num / image.num_across);
  var across_num = frame_num % image.num_across;
  var sx = image.width * across_num + (image.gap | 0) * Math.max(0, across_num - 1);
  var sy = image.height * down_num; + (image.gap | 0) * Math.max(0, down_num - 1);
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-angle);
  context.drawImage(image.img,
    sx, sy, image.width, image.height,
    - image.width / 2, - image.height / 2, image.width, image.height);
  ctx.restore();
}
