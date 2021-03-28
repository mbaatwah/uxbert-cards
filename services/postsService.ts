
import Comment from '../models/Comment';
import Post from '../models/Post';
import { User } from '../models/User';
import { Logger, LoggingLevel } from './loggingService';

interface GetAllPostsViewModel{ //TODO: put this somewhere where it makes more sense.
    entries: Post[];
    count: number;
}

async function getAllPosts(page: number = 0) : Promise<GetAllPostsViewModel | null> {
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/posts'); 
        const posts = (await res.json()) as Post[]; //NOTE: the provided API doesn't support pages, this code simulates paging using slice...
        return {
            entries: posts.slice((page * 12), (page + 1) * 12),
            count: posts.length
        };
    }catch(ex){
        Logger.Instance?.log(LoggingLevel.HIGH, 'postsService', 'getAllPosts', ex)
        return null;
    }
}

async function getPost(id: number) : Promise<Post | null> {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return (await res.json()) as Post;
    } catch(ex){
        Logger.Instance?.log(LoggingLevel.HIGH, 'postsService', 'getPost', ex)
        return null;
    }
}

async function getUser(userId: number) : Promise<User | null>{
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
        return ((await res.json())[0]) as User;
    } catch(ex){
        Logger.Instance?.log(LoggingLevel.HIGH, 'postsService', 'getUser', ex)
        return null;
    }
}

async function getComments(postId: number) : Promise<Comment[] | null> {
    try{
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
        return (await res.json()) as Comment[];
    } catch(ex){
        Logger.Instance?.log(LoggingLevel.HIGH, 'postsService', 'getComments', ex)
        return null;
    }
    
}

export default {
    getAllPosts,
    getPost,
    getUser,
    getComments
}