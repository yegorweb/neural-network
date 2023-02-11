import { appendFile, readFile } from "fs";

var pwd = process.cwd()

/** Library that create, fit, run neural networks */
export module NN {

  /** Class for initializating a neural network */
  export class NeuralNetwork {
    layers: Array<Layer>
    structure: Array<Array<number>> = []
  
    constructor(layers: Array<Layer>) {
      this.layers = layers
  
      readFile(pwd+'/structure.json', (err, data) => {
        if (err) return this.initStructure()
        this.structure = JSON.parse(data.toString())
      })
    }

    /** Fit a neural network */
    public fit(parameters: FitParameters): void {
      
    }

    /** Run a neural network */
    public evalute(): void {

    }

    /** Creates structure.json */
    private initStructure(): void {
      this.structure = []

      for (let layer_index = 0; layer_index < this.layers.length; layer_index++) {
        let layer = this.layers[layer_index]
        
        this.structure.push([])
        for (let _ = 0; _ < layer.neurons_amount; _++ ) {
          this.structure[layer_index].push(Math.random())
        }
      }
  
      appendFile(pwd+'/structure.json', JSON.stringify(this.structure), (err) => console.error(err))
    }
  }

  /** Type of fit parameters */
  interface FitParameters {
    dataset: Dataset,
    epochs: number,
    activation_function_type: string
  }



  /** Creates neurons layer */
  export class Layer {
    neurons_amount: number
    
    constructor(neurons_amount: number) {
      this.neurons_amount = neurons_amount
    }
  }
  
  /** Parse .data file and return dataset in type Array<DatasetItem> */
  function parse_data(data_url: string): Array<DatasetItem> {
    let result: Array<DatasetItem> = []

    readFile(data_url, (err, data) => {
      if (err) return console.error('Указанный файл с датасетом не существует')

      // Разделяем на строки
      data.toString().split('\n').forEach(() => {

      })
    })

    return result
  }

  /** Creates a dataset */
  export class Dataset {
    dataset: Array<DatasetItem>
    
    constructor(dataset: Array<DatasetItem>) {
      this.dataset = dataset
    }
  }

  /** Type of dataset parameters */
  interface DatasetItem {
    input_data: Array<number>,
    output_data: Array<number>
  }
}