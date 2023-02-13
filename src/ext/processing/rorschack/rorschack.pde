/*
mouse's x coordinate controls the noise scale
mouse y controls the perlin noise seed
*/

PGraphics pg;
float noiseScale;
float noiseThreshold = 0.5;

void setup(){
  size(1000, 1000);
  pg = createGraphics(width, height);
}

void draw(){
  background(0);
  noiseScale = map(mouseX, 0, width, 0.01, 0.04);
  noiseSeed(mouseY);
  drawRorschack();
}

void drawRorschack(){
  pg.beginDraw();
  float d = (width*width+height*height)/6; // proportional to the distance from the center
  float mult;
  float xPerlin, yPerlin;
  for(int x=(int)((-width/2)*1.5); x<(int)(1.5*width/2); x++){
    for(int y=(int)((-height/2)*1.5); y<(int)(1.5*height/2); y++){
      mult = map(x*x+y*y, 0, d, 1.2, 0.0);
      xPerlin = x*noiseScale;
      yPerlin = y*noiseScale;
      pg.set(x+width/2, y+height/2, color(noise(xPerlin,yPerlin)*255*mult));
    }
  }
  pg.endDraw();
  pg.filter(THRESHOLD,noiseThreshold);
  imageMode(CENTER);
  image(pg, width/2, height/2);
}
