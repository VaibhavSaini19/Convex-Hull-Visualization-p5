const points = [];
const hull = [];

let maxPts = 60;
let pad = 70;
let leftmost;

let currentVertex;
let nextVertex;

let nextIndex;
let nextPoint;

function setup(){
    createCanvas(800, 600);
    // frameRate(5);
    background(0);
    stroke(255);
    strokeWeight(10);
    for(var i=0; i<maxPts; i++){
        points.push(createVector(pad+random(width-2*pad), pad+random(height-2*pad)));
    }
    points.sort((a, b) => a.x-b.x);
    
    leftmost = points[0];
    
    currentVertex = leftmost;
    nextVertex = points[1];
    nextIndex = nextPoint = 2;
    // console.log(points);
    hull.push(currentVertex);
}

function draw(){
    background(0);
    for(pt of points){
        point(pt.x, pt.y);
    }
    stroke(0,255, 0);
    strokeWeight(20);
    point(leftmost.x, leftmost.y);
    point(nextVertex.x, nextVertex.y);
    for(vertex of hull){
        point(vertex.x, vertex.y);
    }
    
    stroke(0, 0, 255);
    strokeWeight(2);
    line(currentVertex.x, currentVertex.y, nextVertex.x, nextVertex.y);

    stroke(255);
    let checking = points[nextIndex];
    line(currentVertex.x, currentVertex.y, checking.x, checking.y);

    const a = p5.Vector.sub(nextVertex, currentVertex);
    const b = p5.Vector.sub(checking, currentVertex);
    const cross = a.cross(b);
    if(cross.z < 0){
        nextVertex = checking;
    }
    nextIndex += 1;

    if(nextIndex == maxPts){
        nextIndex = 0;
        if(nextVertex == hull[0]){
            hull.push(nextVertex);
            finish();
        }
        hull.push(nextVertex);
        currentVertex = nextVertex;
        nextVertex = points[0];
    } 
}


function finish(){
    background(0);
    for(pt of points){
        point(pt.x, pt.y);
    }
    stroke(0,255, 0);
    strokeWeight(20);
    point(leftmost.x, leftmost.y);
    point(nextVertex.x, nextVertex.y);
    for(vertex of hull){
        point(vertex.x, vertex.y);
    }
    stroke(255, 0, 0);
    strokeWeight(5);
    // beginShape();
    var l = hull.length;
    for(var i=0; i<l; i++){
        line(hull[i].x, hull[i].y, hull[(i+1)%l].x, hull[(i+1)%l].y);
    }
    // endShape();
    noLoop();
}
