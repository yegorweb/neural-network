import { appendFile, readFile } from "fs";

var pwd = process.cwd()

export module NN {
  export class NeuralNetwork {
    layers: Array<Layer>
    structure: Array<Array<number>> = []
  
    constructor(layers: Array<Layer>) {
      this.layers = layers
      console.log(this.layers.length)
  
      readFile(pwd+'/structure.json', (err, data) => {
        if (err) return this.initStructure()
        this.structure = JSON.parse(data.toString())
        console.log(this.structure)
      })
    }
  
    fit(): void {
  
    }
  
    initStructure(): void {
      this.structure = []

      for (let layer_index = 0; layer_index < this.layers.length; layer_index++) {
        let layer = this.layers[layer_index]
        
        this.structure.push([])
        for (let _ = 0; _ < layer.neurons_amount; _++ ) {
          this.structure[layer_index].push(Math.random())
        }
      }
  
      appendFile(pwd+'/structure.json', JSON.stringify(this.structure), (err) => console.error(err))
      console.log(this.structure)
    }
  }

  /** Класс, создающий слой нейронов */
  export class Layer {
    neurons_amount: number

    constructor(neurons_amount: number) {
      this.neurons_amount = neurons_amount
    }
  }

  export class Dataset {
    constructor() {

    }
  }
}