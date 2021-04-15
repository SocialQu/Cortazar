// npx ts-node utils/train

import { iEmbeddedStory } from '../analysis'


const embeddings = {
    title: [ 0.41311305277564503, -0.24382772009047077 ],
    subtitle: [ -0.042087932927928944, 0.3578145273592617 ],
    tags: [
        [ -0.2276100638142111, -0.28696085595367044 ],
        [ -0.4764870967505728, -0.3108245641895302 ],
        [ 0.016820366025685353, -0.20281198116246568 ],
        [ -0.09968359094004892, -0.234949620668425 ],
        [ -0.28478738797241493, -0.1908676252075433 ]
    ],
    topics: [ [ -0.03930014979788328, -0.10785881473135324 ] ],
    paragraphs: [
        [ 0.4131131000403186, -0.24382787709503728 ],
        [ 0.32432795541395854, -0.12196366634835233 ],
        [ -0.12769545945806388, 0.6808877484879013 ],
        [ 0.30013200945170526, -0.13945011518254272 ]
    ]
}


const vectors = [ embeddings.title, embeddings.subtitle].reduce((d, i, _, l) => [d[0] + (i[0]/l.length), d[1] + (i[1]/l.length)], [0, 0])
// console.log('Vectors', vectors)

const findCenter = (vectors: number[][]) =>  vectors.reduce((d, i, _, l) => [d[0] + (i[0]/l.length), d[1] + (i[1]/l.length)], [0, 0])
export const centerStory = ({ embeddings }: iEmbeddedStory): number[] => {
    const paragraphs = findCenter(embeddings.paragraphs)
    const tags = findCenter(embeddings.tags)
    const topics = findCenter(embeddings.topics)


    const arrayedStory = [
        ...[...Array(6)].map(() => embeddings.title),
        ...[...Array(4)].map(() => embeddings.subtitle),

        ...[...Array(5)].map(() => paragraphs),
        ...[...Array(3)].map(() => tags),
        ...[...Array(2)].map(() => topics)
    ]

    const center = findCenter(arrayedStory)
    return center
}

