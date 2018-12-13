const canvas = document.querySelector('canvas');
canvas.height = 400;
canvas.width = 360;
const c = canvas.getContext('2d');
c.fillStyle = "black";
c.lineWidth = 5;
c.font = "bold 15px Comic Sans MS";

function drawGallows() {
  c.beginPath();
  //Base
  c.fillRect(230, 390, 100, 10);
  //Main Post
  c.fillRect(270, 50, 20, 350);
  //Post Extension
  c.fillRect(138, 50, 132, 10);
  // Noose Holder
  c.fillRect(138, 50, 10, 40)
  c.stroke();
}


const hangmanBody = {
  drawHead: () => {
    const headProp = {
      x: 142.5,
      y: 130,
      r: 40,
      circum: Math.PI * 2,
      start: Math.PI * 1.5, //start at the top
      finish: 100, // in %
      current: 0 // in %
    };
    function animateArc(draw_to) {
      //start over
      c.beginPath();
      c.arc(headProp.x, headProp.y, headProp.r, headProp.start, draw_to, false);
      c.stroke();
      headProp.current += 2;

      if (headProp.current < headProp.finish + 1) {
        requestAnimationFrame(function() {
          animateArc(headProp.circum * headProp.current / 100 + headProp.start);
        });
      }
    };
    animateArc();
  },
  drawTorso: () => {
    const torsoProp = {
      xStart: 142.5,
      yStart: 170,
      xCurrent: 142.5,
      yCurrent: 170,
      xEnd: 142.5,
      yEnd: 270
    };
    animateLine(torsoProp);
  },
  drawLeftArm: () => {
    const leftArmProp = {
      xStart: 142.5,
      yStart: 200,
      xCurrent: 142.5,
      yCurrent: 200,
      xEnd: 92.5,
      yEnd: 240
    };
    animateLine(leftArmProp);
  },
  drawRightArm: () => {
    const rightArmProp = {
      xStart: 142.5,
      yStart: 200,
      xCurrent: 142.5,
      yCurrent: 200,
      xEnd: 182.5,
      yEnd: 240
    }
    animateLine(rightArmProp);
  },
  drawLeftLeg: () => {
    const leftLegProp = {
      xStart: 142.5,
      yStart: 270,
      xCurrent: 142.5,
      yCurrent: 270,
      xEnd: 100,
      yEnd: 311.5
    }
    animateLine(leftLegProp);
  },
  drawRightLeg: () => {
    const rightLegProp = {
      xStart: 142.5,
      yStart: 270,
      xCurrent: 142.5,
      yCurrent: 270,
      xEnd: 180,
      yEnd: 311.5
    }
    animateLine(rightLegProp)
  },
  killHangman: () => {
    const eyeSimbol = 'X';
    c.fillText(eyeSimbol, 125, 125);
    c.fillText(eyeSimbol, 150, 125);
  }
}

function animateLine(lineProps) {
  drawingInProgress = true;
  c.beginPath();
  c.moveTo(lineProps.xStart, lineProps.yStart);
  c.lineTo(lineProps.xCurrent, lineProps.yCurrent);
  c.stroke();
  
  //If drawing to the right
  if (lineProps.xStart - lineProps.xEnd < 0 && lineProps.xCurrent < lineProps.xEnd) {
    lineProps.xCurrent += 1;
  } 
  //If drawing to the left
  else if (lineProps.xStart - lineProps.xEnd > 0 && lineProps.xCurrent > lineProps.xEnd) {
    lineProps.xCurrent -= 1;
  }

  //If drawing to the bottom
  if (lineProps.yStart - lineProps.yEnd < 0 && lineProps.yCurrent < lineProps.yEnd) {
    lineProps.yCurrent += 1;
  } 
  //If drawing to the top
  else if (lineProps.yStart - lineProps.yEnd > 0 && lineProps.yCurrent > lineProps.yEnd) {
    lineProps.yCurrent -= 1;
  }

  if (lineProps.yCurrent < lineProps.yEnd || lineProps.xCurrent < lineProps.xEnd) {
    requestAnimationFrame(function() {
      animateLine(lineProps);
    });
  } else {
    drawingInProgress = false;
  }
};

function clearFigure() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  drawGallows();
}