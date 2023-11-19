function getRandomColor() {

    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);
    if (red < 20 && green < 20 && blue < 20) {
      return getRandomColor();
    }
    var color = "rgb(" + red + "," + green + "," + blue + ")";
  
    return color;
  }
  export default getRandomColor;