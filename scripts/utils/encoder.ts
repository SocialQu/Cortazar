// Source: https://observablehq.com/@jerdak/tensorflow-js-dimensionality-reduction-autoencoder


import * as tf from '@tensorflow/tfjs-node'


export const autoencoder = async() => {
    const model = tf.sequential()
  
    // To simulate PCA we use 1 hidden layer with a linear (relu) activation
    const encoder = tf.layers.dense({
        units: 3, 
        batchInputShape: [ 1, 512 ],            //We will input N samples X 4 columns
        activation: 'relu',
        kernelInitializer:"randomNormal",       //Randomize to avoid degenerate cases
        biasInitializer:"ones"
    })

    const decoder = tf.layers.dense({ units:512, activation:'relu' })

    model.add(encoder)
    model.add(decoder)
    await model.compile({optimizer: 'sgd', loss: 'meanSquaredError'})
    
    return  { model, encoder, decoder }
}

/*
const autoencoderTrain = () => {
    const xs = tf.tensor2d(irisDataSliced);
    let h = await autoencoder.model.fit(xs, xs, {epochs: 5,batchSize:15,shuffle:true,validationSpit:0.1});
    xs.dispose();
    return h;
}
*/
