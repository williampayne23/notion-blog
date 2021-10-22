import { createContext, useState } from 'react';
import config from '../config';

export const ApiContext = createContext();


function useApi(){
    const [state, updateState] = useState({
        blogPosts: [],
        sequences: [],
        blocks: {},
        lastUpdated: null
    })

    const NOTION_BLOG_ID=config.NOTION_BLOG_ID
    const NOTION_SEQUENCES_ID=config.NOTION_BLOG_ID
    const TABLE_URL="https://notion-api.splitbee.io/v1/table/"
    const BLOCKS_URL="https://notion-api.splitbee.io/v1/page/"

    const fetchAllPosts = async () => {
        const posts =  await fetch(`${TABLE_URL}${NOTION_BLOG_ID}`)
                        .then((res) => res.json());
        return posts.map(p => ({...p, slug:"" + encodeURI(p.Name).toLowerCase()}));
    }

    const fetchAllSequences = async () => {
        const sequences =  await fetch(`${TABLE_URL}${NOTION_SEQUENCES_ID}`)
                                    .then((res) => res.json());
        return sequences.map(s => ({...s, slug:"sequence/" + encodeURI(s.Name).toLowerCase()}));
    }

    async function updateData(){
        const blogPosts = await fetchAllPosts()
        const sequences = await fetchAllSequences()
        updateState({
            blogPosts,
            sequences,
            blocks: {},
            lastUpdated: new Date()
        });
    }

    function getAllSequences(){
        if (state.lastUpdated === null){
            updateData();
            return [];
        }else if(new Date() - state.lastUpdated > 10 * 60* 1000){
            updateData();
        }
        return state.sequences;
    }

    function getAllPosts(){
        if (state.lastUpdated === null){
            updateData();
            return [];
        }else if(new Date() - state.lastUpdated > 10 * 60* 1000){
            updateData();
        }
        return state.blogPosts;
    }

    async function addBlocks(id){
        const newBlocks = await fetch(`${BLOCKS_URL}${id}`).then((res) => res.json());
        const blocks = state.blocks;
        blocks[id] = newBlocks;

        updateState({...state, blocks})
    }

    function getBlocks(id){
        if (state.lastUpdated === null){
            updateData();
            return [];
        }
        
        if(new Date() - state.lastUpdated > 10 * 60* 1000){
            updateData();
            return [];
        }

        if(!state.blocks[id]){
            addBlocks(id)
            return [];
        }
        return state.blocks[id]
    }

    return [getAllPosts, getAllSequences, getBlocks];
}

export function ApiContextProvider({children}){
    const [getAllPosts, getAllSequences, getBlocks] = useApi()

    function compareFunction(a, b){
        if ((a['Pinned?'] && b['Pinned?']) || (!a['Pinned?'] && !b['Pinned?'])){
            if (new Date(a['Publishing Date']) > new Date(b['Publishing Date']))
                return -1;
            else
                return 1;
        }
        if (a['Pinned?']){
            return -1;
        }
        return 1;
    }

    const api = {
        getSortedPosts() {
            return getAllPosts().sort(compareFunction)
        },
        getSortedSequences(){ 
            return getAllSequences().sort(compareFunction)
        },
        getPostBySlug(slug){
            const posts = getAllPosts()
            if(!posts)
                return null;
            const post = posts.find((t) => t.slug === slug);
            if(!post)
                return null;

            let sequenceDetail = {}
            const sequence = getAllSequences().find(s => s.id === post.Sequence[0])
            if(sequence){
                const sequencePosts = this.getSortedPosts().filter(p => sequence.Posts.includes(p.id))
                let index = 0
                sequencePosts.forEach((p,i) => {
                    if (p.id === post.id)
                        index = i;
                });
                sequenceDetail = {
                    sequence : sequence.Name,
                    previous: index+1 >= sequencePosts.length? null : sequencePosts[index+1],
                    next: index-1 < 0? null :  sequencePosts[index-1]
                }
            }

            post.sequenceDetail = sequenceDetail;
            post.blocks = getBlocks(post.id)
            return post;
        },
        getSequenceBySlug(slug){
            console.log(slug)

            const sequences = getAllSequences()
            console.log(sequences)
            if(!sequences)
                return null;

            const sequence = sequences.find((t) => t.slug === "sequence/" + slug);
            console.log(sequence)
            if(!sequence)
                return null;

            
            sequence.posts  = getAllPosts().filter(post => sequence.Posts?.includes(post.id));
            sequence.blocks = getBlocks(sequence.id)

            return sequence
        }
    }
    
    return <ApiContext.Provider value={api}>
        {children}
    </ApiContext.Provider>
}