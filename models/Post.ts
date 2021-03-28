import User from "./User";
import Comment from './Comment';

export default interface Post{
    userId: number;
    id: number;
    title: string;
    body: string;
    user: User;
    comments: Comment[];
}