const WIDTH=500,
      HEIGHT=500,
      canvas=document.getElementById('canvas'),
      context=canvas.getContext('2d'),
      numberAntennaNode=10;
    
canvas.width=WIDTH;
canvas.height=HEIGHT;
canvas.style.background='#000';
var antenna_spacing=WIDTH/numberAntennaNode,
    antennaArr=[],
    phaseDiff=0;

var antenna_base={
    x:0,
    y:HEIGHT-35,
    w:WIDTH,
    h:20,

    drawBase:function () {  
        context.beginPath();
        context.fillStyle='#FEDCBA';
        context.fillRect(antenna_base.x, antenna_base.y, antenna_base.w,
            antenna_base.h);
        context.closePath();
    }
}

for(let i=0;i<numberAntennaNode-1;i++){
    antennaArr.push(new Antenna_Node((i+1)*antenna_spacing,antenna_base.y-20,7,(i+1)));
}

function Antenna_Node(x, y, radius, phaseDiff){
    this.x=x;
    this.y=y;
    this.radius=radius;
    this.phaseDiff=phaseDiff;
    this.radiusArr=[];
    //this.radiusArr.push(12);
}

Antenna_Node.prototype.drawNode=function () {  
    context.beginPath();
    context.fillStyle='#f00';
    context.arc(this.x, this.y, this.radius,0, 2*Math.PI);
    context.fill();
    context.closePath();
    context.beginPath();
    context.strokeStyle='#FEDCBA';
    context.lineWidth=3;
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, antenna_base.y);
    context.stroke();
    context.closePath();
};

Antenna_Node.prototype.radiateWave=function(){
    this.radiusArr.forEach((r)=>{
        context.beginPath();
        context.strokeStyle="3DF000";
        context.lineWidth=2;
        context.arc(this.x, this.y, r,-Math.PI/6,Math.PI+Math.PI/6,true);
        context.stroke();
        context.closePath();
    });
};

function updateRadius(){
    antennaArr.forEach((a)=>{
        for(let i=0;i<a.radiusArr.length;i++){
            let r=a.radiusArr[i];
            r++;
            a.radiusArr[i]=r;

            //if radius is greater than the width or height
            if(r>WIDTH || r>HEIGHT){
                a.radiusArr.splice(i,1);
            }
        }
    });
}

function drawAllNodes(){
    antennaArr.forEach((a)=>{
        a.drawNode();
    });
}

function drawPhasedArrayRadar(){
    context.clearRect(0,0,WIDTH,HEIGHT);
    antenna_base.drawBase();
    antennaArr.forEach((a)=>{
        a.radiateWave();
    });
    drawAllNodes();
    updateRadius();
}

setInterval(drawPhasedArrayRadar, 10);

setInterval(()=>{
    phaseDiff++;
    antennaArr.forEach((a)=>{
        if(phaseDiff==numberAntennaNode- a.phaseDiff){
            a.radiusArr.push(12);
        }
        if(phaseDiff>=numberAntennaNode){
            phaseDiff=0;
        }       
    });
},100);
