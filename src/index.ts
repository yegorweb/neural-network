import { NN } from "./nn-library";

const neural_network = new NN.NeuralNetwork( [new NN.Layer(3), new NN.Layer(10), new NN.Layer(1)] )
const dataset = new NN.Dataset([
  {
    input_data: [3.4, 2.4, 8.8, 4.1],
    output_data: [1, 0, 0]
  }
])

const dataset_from_iris = new NN.Dataset(NN.parse_data('src/iris.data'))

neural_network.fit({
  dataset: dataset_from_iris,
  activation_function_type: 'sigmoid',
  epochs: 1000
})

neural_network.evalute({
  input_data: [5.8, 2.8, 5.1, 2.4]
})

// console.log(dataset)
// console.log(NN.parse_data('src/iris.data'))
