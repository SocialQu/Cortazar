import * as use from '@tensorflow-models/universal-sentence-encoder'
import * as tf from '@tensorflow/tfjs-node'


// Calculate the dot product of two vector arrays.
const sum = (xs:number[]) => xs.reduce((a, b) => a + b, 0)

// zipWith :: (a -> b -> c) -> [a] -> [b] -> [c]
const zipWith = (f:any, xs:number[], ys:number[]) => xs.map((x, i) => f(x, ys[i]))
export const dotProduct = (xs:number[], ys:number[]) => sum(zipWith((a:any, b:any) => a * b, xs, ys))



export const scoreSimilarity = () => use.load().then(async model => {
    const sentences = [
       'I want italian food.',
       'Do you have some pasta?'
    ];

    const embeddings = await model.embed(sentences)

    const s1 = tf.slice(embeddings, [0, 0], [1])
    const s2 = tf.slice(embeddings, [1, 0], [1])
    const similarity = tf.matMul(s1, s2, false, true).dataSync();
});
