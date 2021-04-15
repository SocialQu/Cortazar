// npx ts-node recommend


import * as use from '@tensorflow-models/universal-sentence-encoder'
import * as tf from '@tensorflow/tfjs-node'

import { PCA } from 'ml-pca'


const sentences = [
    'I like my phone.',
    'Your cellphone looks great.',
    'How old are you?',
    'What is your age?',
    'An apple a day, keeps the doctors away.',
    'Eating strawberries is healthy.'
];


use.load().then(async model => {
    const embeddings = await model.embed(sentences)
    embeddings.print(true); // verbose

    const dataset = [...Array(embeddings.shape[0])].reduce((d, i, idx) => 
        [...d, Array.from(tf.slice(embeddings, [idx, 0], [1]).dataSync())], []
    )
    
    const pca = new PCA(dataset);
    console.log('dataset:', pca.predict(dataset, {nComponents:2}));
});


