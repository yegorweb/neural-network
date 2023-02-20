import { appendFile, readFile, readFileSync } from "fs";

var pwd = process.cwd()

/** Library that create, fit, run neural networks */
export module NN {

  /** Class for initializating a neural network */
  export class NeuralNetwork {
    layers: Layer[]
    structure: number[][] = []
  
    constructor(layers: Layer[]) {
      this.layers = layers
      console.log('✨ Initailizated neural network')
  
      readFile(pwd+'/src/structure.json', (err, data) => {
        if (err) return this.initStructure()
        this.structure = JSON.parse(data.toString())
      })
    }

    /** Fit a neural network */
    public fit(parameters: FitParameters): void {
      
    }

    /** Run a neural network */
    public evalute(parameters: EvaluteParameters): void {

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
  
      appendFile(pwd+'/src/structure.json', JSON.stringify(this.structure), (err) => {
        if (err) console.error(err)
        console.log('✨ Added structure.json')
      })
    }
  }

  /** Type of fit parameters */
  interface FitParameters {
    dataset: Dataset,
    epochs: number,
    activation_function_type: string
  }

  interface EvaluteParameters {
    input_data: number[]
  }


  /** Creates neurons layer */
  export class Layer {
    neurons_amount: number
    neurons: Neuron[] = []

    constructor(neurons_amount: number) {
      this.neurons_amount = neurons_amount

      for (let i = 0; i < neurons_amount; i++) this.neurons.push(new Neuron(Math.random()))
    }
  }

  class Neuron {
    weight: number

    constructor (weight: number) {
      this.weight = weight
    }
  } 
  
  /** Parse .data file and return dataset in type DatasetItem[] */
  export function parse_data(data_url: string): DatasetItem[] | undefined {
    let result: DatasetItem[] = []
    
    // Обнаруженные типы
    let output_data_types: string[] = []
    
    try {
      let data_text = readFileSync(data_url).toString()
      
      // Обнаруживаем типы
      data_text.split('\n').forEach(line => {
        let data = line.split(',')
        let output_data: any = data.at(-1)  // Результат в конце        

        // Добавляем обнаруженный тип
        if (!output_data_types.some(x => x == output_data) || output_data_types.length<1) output_data_types.push(output_data)
      })
      
      // Обрабатываем строки
      data_text.split('\n').forEach(line => {
        let data = line.split(',')
        
        let input_data: any[] = data.slice(0, -1).map(num => Number(num))  // Входные данные в начале        
        let output_data: any = data.at(-1)  // Результат в конце        
              
        // Добавляем данные в результат
        result.push({
          input_data: input_data,
          output_data: output_data_types.map(data_type => data_type === output_data ? 1 : 0)
        })
      })
    } catch (e) {
      console.error('Указанный файл с датасетом не существует')
    }

    console.log('✨ .data parsed successfully')
    return result
  }

  /** Creates a dataset */
  export class Dataset {
    dataset: DatasetItem[r
    
    constructor(dataset: DatasetItem[] | undefined) {
      if (typeof dataset !== 'DatasetItem[]') {
        return
        console.log('')
      }

      this.dataset = dataset
      console.log('✨ Created a dataset')
    }
  }

  /** Type of dataset parameters */
  interface DatasetItem {
    input_data: number[],
    output_data: number[]
  }
}
