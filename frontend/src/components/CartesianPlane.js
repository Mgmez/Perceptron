import React, {useEffect} from "react";

var widthCanvas, heightCanvas;

const CartesianPlane = (props) => {
    
    useEffect(() => {
        document.getElementById("cartesian_plane").style.width = "auto";
        widthCanvas = document.getElementById("cartesian_plane").width;
        heightCanvas = document.getElementById("cartesian_plane").height;

        var canvas = document.getElementById("cartesian_plane"),
            ctx = canvas.getContext("2d"),
            cty = canvas.getContext("2d");
            
        ctx.moveTo(widthCanvas/2,0);
        ctx.lineTo(widthCanvas/2,heightCanvas);
        ctx.stroke();

        cty.moveTo(0,heightCanvas/2);
        cty.lineTo(widthCanvas,heightCanvas/2);
        cty.stroke();
    }, [])
    
    
    const MaxX = () => {
        return 5;
    }
    
    // Returns the left boundary of the logical viewport:
    const MinX = () => {
        return -5;
    }

    const MaxY = () => {
        return 5;
    }
    
    // Returns the left boundary of the logical viewport:
    const MinY = () => {
        return -5;
    }

    // Returns the physical x-coordinate of a logical x-coordinate:
    const XC = (x) => {
        return (x - MinX()) / (MaxX() - MinX()) * widthCanvas
    }

    // Returns the physical y-coordinate of a logical y-coordinate:
    const YC = (y) => {
        return heightCanvas - (y - MinY()) / (MaxY() - MinY()) * heightCanvas ;
    }

    // Returns the logical x-coordinate of a physical x-coordinate:
    const XL = (x) => {
        //return (x * widthCanvas) / (MaxX() - MinX()) + MinX()
        return ((x * (MaxX() - MinX() ) ) / widthCanvas)  + MinX()
    }

    // Returns the logical y-coordinate of a physical y-coordinate:
    const YL = (y) => {
        //return heightCanvas - (y - MinY()) / (MaxY() - MinY()) * heightCanvas ;
        return MaxY() - (y * (MaxY() - MinY())) / heightCanvas;
        //return  y * heightCanvas  - (MinY()/MaxY()-MinY()) *  heightCanvas
    }
    
    const handleClick = (event) => {
        event.preventDefault();
        const canvas = document.getElementById("cartesian_plane"), 
            rect = canvas.getBoundingClientRect(),
            physicalXCoordinate = event.clientX - rect.left,
            physicalYCoordinate = event.clientY - rect.top,
            logicalXCoordinate = XL(physicalXCoordinate),
            logicalYCoordinate = YL(physicalYCoordinate)
        console.log(logicalXCoordinate)
        console.log(logicalYCoordinate)

        //////
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#FF0000";
        ctx.fillRect(physicalXCoordinate-2,physicalYCoordinate-2,4,4); //cuadrito

        /*ctx.beginPath(); 
        ctx.arc(95,50 ,5,0,2*Math.PI);//circulito
        ctx.stroke();
        */
    }

    return <>
        <canvas
            id="cartesian_plane"
            style={{border: "1px solid #d1d1d1"}}
            onClick={handleClick}
            onContextMenu={handleClick}
            width={500}
            height={500}
        ></canvas>
    </>
}

export default CartesianPlane;