var canvas = document.getElementById('test');
var ctx= canvas.getContext("2d");
let width = $(canvas).width();
let height = $(canvas).height();
let fontSize = 90;
ctx.fillStyle = '#fff';
ctx.fillRect(0, 0, width, height);
ctx.fillStyle = '#000';
ctx.font = `${fontSize}px Arial`;
ctx.textAlign = 'center';
ctx.fillText('Mher', width/2, height/2 + fontSize/4);


let step = 2;
let particles =[];

const data    = ctx.getImageData(0, 0, width, height).data;
const data32  = new Uint32Array(data.buffer);

for (let x = 0; x < width; x += step) {
    for (let y = 0; y < height; y += step) {
        const color = data32[y * width + x];
        if (color != 0xFFFFFFFF) {
            let c = color - x*350 + y*195;
            particles.push({ x, y,c });
        }
     }
 }

 particles.forEach((particle) => {
    let col = toColor(particle.c);
    ctx.fillStyle = col;
    ctx.fillRect(
        particle.x - 1,
        particle.y ,
        step,
        step
    );
});

function toColor(num) {
    num >>>= 0;
    var b = num & 0xFF,
        g = (num & 0xFF00) >>> 8,
        r = (num & 0xFF0000) >>> 16,
        a = ( (num & 0xFF000000) >>> 24 ) / 255 ;
    return "rgba(" + [r, g, b, a].join(",") + ")";
}
