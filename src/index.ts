import { NN } from "./nn-library";

const neural_network = new NN.NeuralNetwork([new NN.Layer(3), new NN.Layer(10), new NN.Layer(1)])
const dataset = new NN.Dataset([
  {
    input_data: [2],
    output_data: [2]
  }
])

console.log(NN.parse_data('src/iris.data'))