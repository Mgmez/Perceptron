import React, {Component} from "react";

class CartesianPlane extends Component {
    render() {
        return <>
            <canvas id="cartesian_plane" style={{width: "100%", border: "1px solid #d1d1d1"}}></canvas>
        </>
    }
}

export default CartesianPlane;