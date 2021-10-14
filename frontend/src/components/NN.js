
import React, { useEffect, useState, useContext } from "react";
import { PerceptronContext } from "./PerceptronContext";
import ForceGraph3D from '3d-force-graph';

const NN2 = (props) => {
  const { perceptronState, setPerceptronState } = useContext(PerceptronContext);

  var myGraph = ForceGraph3D();

  let data = new Object();
  let nodes = [];
  let links = [];

  const gData = {
    nodes: [
      /* {
         id: "id1",
         name: "name1",
         val: 1,
         group: 1
       },  */
      { id: "N1C1", group: 1, val: 10 },
      { id: "N2C1", group: 1, val: 10 },
      { id: "N1C2", group: 2, val: 3 },
      { id: "N2C2", group: 2, val: 3 },
      { id: "N3C2", group: 2, val: 3 },
      { id: "N4C2", group: 2, val: 3 },
      { id: "N5C2", group: 2, val: 3 },
      { id: "N1C3", group: 3, val: 7 },
      { id: "N2C3", group: 3, val: 7 },
      { id: "N3C3", group: 3, val: 7 },
    ],
    links: [
      { source: "N1C1", target: "N1C2", value: 3 },
      { source: "N2C1", target: "N1C2", value: 3 },
      { source: "N1C1", target: "N2C2", value: 3 },
      { source: "N2C1", target: "N2C2", value: 3 },
      { source: "N1C1", target: "N3C2", value: 3 },
      { source: "N2C1", target: "N3C2", value: 3 },
      { source: "N1C1", target: "N4C2", value: 3 },
      { source: "N2C1", target: "N4C2", value: 3 },
      { source: "N1C1", target: "N5C2", value: 3 },
      { source: "N2C1", target: "N5C2", value: 3 },


      { source: "N1C2", target: "N1C3", value: 5 },
      { source: "N1C2", target: "N2C3", value: 5 },
      { source: "N1C2", target: "N3C3", value: 5 },

      { source: "N2C2", target: "N1C3", value: 5 },
      { source: "N2C2", target: "N2C3", value: 5 },
      { source: "N2C2", target: "N3C3", value: 5 },
      { source: "N3C2", target: "N1C3", value: 5 },
      { source: "N3C2", target: "N2C3", value: 5 },
      { source: "N3C2", target: "N3C3", value: 5 },
      { source: "N4C2", target: "N1C3", value: 5 },
      { source: "N4C2", target: "N2C3", value: 5 },
      { source: "N4C2", target: "N3C3", value: 5 },
      { source: "N5C2", target: "N1C3", value: 5 },
      { source: "N5C2", target: "N2C3", value: 5 },
      { source: "N5C2", target: "N3C3", value: 5 },



    ]
  }

  console.log(perceptronState.perceptron.layers);
  let numCapas = perceptronState.perceptron.layers.length;
  perceptronState.perceptron.layers.forEach((layer, index) => {
    let numCapa = index;

    layer.forEach((neuron, index2) => {
      let id = "N" + (index2 + 1) + "C" + (index + 1);
      let numNeuXCapa = neuron.length;
      let numNeu = index2;

      nodes.push({
        id: id,
        n: numNeu,
        group: numCapa + 1,
        val: 10,
        weight: neuron
      });
    });//neuronas


  });//capa


 //Links
  for(let capa = 1; capa < perceptronState.perceptron.layers.length; capa++){
    for (let i = 0; i < nodes.length; i++) {
      if (nodes[i].group === capa){
        for (let j = 1; j < nodes[i].weight.length; j++) {
          links.push({
            source: nodes[i].id,
            target: "N" + (j) + "C" + (capa+1),
            value: nodes[i].weight[j],
            weigth: nodes[i].weight[j]
          })
        }

      }


    }

  }
  data['nodes'] = nodes;
  data['links'] = links;

  console.log(nodes);

  const xd = 3;
  useEffect(() => {

    myGraph(document.getElementById('linechart'))
      .graphData(data)
      .nodeLabel('id')
      .linkLabel('weigth')
      //.linkWidth(1)
      .nodeAutoColorBy('group')
      .linkDirectionalParticles("value")
      .linkDirectionalParticleSpeed(d => d.value * 0.001);
  }, [])

  return (
    <div id="linechart">
    </div>
  )


}
export default NN2;
