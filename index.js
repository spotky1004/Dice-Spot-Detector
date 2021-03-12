img = new Image();
img.crossOrigin = "anonymous";
function calcSpot(imageSrc, callback) {
    img.src = imageSrc;
    document.body.appendChild(img);
    img.onload = function() {
      // create canvas
      var canvas2 = document.createElement("canvas");
      canvas2.width = this.width;
      canvas2.height = this.height;
      document.getElementById("b").append(canvas2);
      var ctx = canvas2.getContext("2d");
      ctx.filter = 'invert(1)';
      ctx.drawImage(this,0,0);
      ctx.filter = 'invert(0)';
      let whiteDetected = [];
      for (let x = 0, l = this.width*this.height; x < l; x+=40) {
        const pos = {x: x%this.width, y: Math.floor(x/this.width)};
        var col = ctx.getImageData(pos.x, pos.y, 1, 1).data;
        if (col[0] == 255 && col[1] == 255 && col[2] == 255) {
          for (let d = 0; d < whiteDetected.length; d++) {
            let p = whiteDetected[d];
          }
          whiteDetected.push(pos);
          ctx.fillStyle = "#f00"
          ctx.fillRect(pos.x,pos.y,10,10);
        }
      }

      let usedPoint = [];
      let spots = 0;
      let dist = 30;
      for (let i = 0; i < whiteDetected.length; i++) {
        if (usedPoint.includes(i)) continue;
        let tempSpot = [i];
        const wdM = whiteDetected[i];
        for (let j = 0; j < whiteDetected.length; j++) {
          if (usedPoint.includes(j)) continue;
          const wdC = whiteDetected[j];
          if (Math.abs(wdC.x-wdM.x) < dist && Math.abs(wdC.y-wdM.y) < dist) tempSpot.push(j);
        }
        if (tempSpot.length >= 8) {
          usedPoint = usedPoint.concat(tempSpot);
          spots++;
          ctx.fillStyle = "#" + ((1<<24)*Math.random() | 0).toString(16);
          for (let j = 0; j < tempSpot.length; j++) {
            const wd = whiteDetected[tempSpot[j]];
            ctx.fillRect(wd.x,wd.y,10,10);
          }
        }
      }
      let resurtDisplay = document.createElement("div");
      resurtDisplay.innerHTML = "count: " + spots;
      document.getElementById("b").append(resurtDisplay);
      callback(spots);
    }
}

calcSpot("./img.png",function(count){
  console.log(count);
});

