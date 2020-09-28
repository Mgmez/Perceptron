
const MAX_Y = 5, MAX_X = 5;
const MIN_Y = -5, MIN_X = -5;

class CPDrawer {
    constructor(canvas) {
        this.canvas = canvas;
        this.widthCanvas = canvas.width;
        this.heightCanvas = canvas.height
    }    
    
    
    // Returns the physical x-coordinate of a logical x-coordinate:
    XC(x) {
        return (x - MIN_X) / (MAX_X - MIN_X) * this.widthCanvas
    }

    // Returns the physical y-coordinate of a logical y-coordinate:
    YC(y) {
        return this.heightCanvas - ((y - MIN_Y) * this.heightCanvas) / (MAX_Y - MIN_Y);
    }

    // Returns the logical x-coordinate of a physical x-coordinate:
    XL(x) {
        return ((x * (MAX_X - MIN_X ) ) / this.widthCanvas)  + MIN_X
    }

    // Returns the logical y-coordinate of a physical y-coordinate:
    YL(y) {
        return MAX_Y - (y *  (MAX_Y - MIN_Y)) / this.heightCanvas;
    }

    drawAxis() {
        const ctx = this.canvas.getContext("2d"),
            cty = this.canvas.getContext("2d");
        
        ctx.beginPath();
        ctx.moveTo(this.widthCanvas/2,0);
        ctx.lineTo(this.widthCanvas/2,this.heightCanvas);
        ctx.stroke();

        cty.beginPath();
        cty.moveTo(0,this.heightCanvas/2);
        cty.lineTo(this.widthCanvas,this.heightCanvas/2);
        cty.stroke();


        ctx.font = "10px Arial";
        ctx.fillStyle = "#000"
        for (let i = MIN_X; i < MAX_X; i++) {
            if (i === 0) continue
            ctx.fillText(`${i}`, this.XC(i), this.YC(-0.2));
            ctx.fillText(`${i}`, this.XC(0.1), this.YC(i));
        }
        ctx.fillText(`${MAX_X}`, this.widthCanvas-10, this.YC(-0.2));
        ctx.fillText(`${MAX_Y}`, this.XC(0.1), 10);
    }

    drawPoint(x, y, value) {
        const rect = this.canvas.getBoundingClientRect(),
            ctx = this.canvas.getContext("2d");

        if(value === 1){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(x-2,y-2,4,4); //cuadrito
        } else {
            ctx.fillStyle = "#000000";
            ctx.beginPath(); 
            ctx.arc(x-1.25,y-1.25,2.5,0,2*Math.PI);//circulito
            ctx.stroke();
        }
    }

    drawLine(x1, y1, x2, y2, color="#000") {
        x1 = this.XC(x1);
        x2 = this.XC(x2);
        y1 = this.YC(y1);
        y2 = this.YC(y2);
        
        const context = this.canvas.getContext("2d");
        context.save();
        context.strokeStyle = color;        
        context.beginPath();
        context.moveTo(x1,y1);
        context.lineTo(x2,y2);
        context.stroke();
        context.restore();
    }

    clearCanvas() {
        const context = this.canvas.getContext("2d");
        
        //context.clearRect(0,0, this.widthCanvas, this.heightCanvas);

        // Store the current transformation matrix
        context.save();

        // Use the identity matrix while clearing the canvas
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.clearRect(0, 0, this.widthCanvas, this.heightCanvas);

        // Restore the transform
        context.restore();
    }
}

export default CPDrawer;