const imageLibrary = {
  "gull" : {
    "file" : "Assets/Gull.png",
    "width" : 24,
    "height" : 24,
    "num_across" : 2,
    "num_down" : 3,
    "gap" : 0,  // TODO: add support for gaps in drawSprite()
 },

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
  var sx = image.width * across_num;
  var sy = image.height * down_num;
  context.drawImage(image.img,
    sx, sy, image.width, image.height,
    x, y, image.width, image.height);
}
