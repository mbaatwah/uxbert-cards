import { useEffect, useMemo, useState } from 'react'
import StandardTemplate from '../../templates/standardTemplate';
import { useRouter } from 'next/router'
import PostsService from '../../services/postsService';
import { Logger, LoggingLevel } from '../../services/loggingService';
import Post from '../../models/Post';
import { User } from '../../models/User';
import Comment from '../../models/Comment';


export default function Posts() {
    const [post, setPost] = useState<Post | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [comments, setComments] = useState<Comment[] | null>(null);
    const router = useRouter();
    const { pid } = router.query;

    useMemo(() => {
        if (pid)
            PostsService.getPost(pid)
                .then(res => {
                    setPost(res)
                    console.log(res.userId)
                    PostsService.getUser(res?.userId).then(user => setUser(user));
                    PostsService.getComments(res?.id).then(comments => setComments(comments));
                })
                .catch(ex => Logger.Instance?.log(LoggingLevel.HIGH, '[pid].tsx', 'default.useMemo', ex));
    }, [pid])

    return (
        <StandardTemplate pageTitle="Test">
            {(post && (
                <>
                    <div className="row p-4 shadow rounded">
                        <div className="col-12 col-lg-4  text-center rounded">
                            <img className="img-fluid rounded" width="600" height="360" src={`https://picsum.photos/seed/${post.id * post.userId}/600/360`} />
                        </div>
                        <div className="col-12 col-lg-8">
                            <h1>{post.title}</h1>
                            <p>{post.body}</p>
                        </div>
                    </div>
                    { 
                        (   user &&
                            (
                            <div className="row p-4 mt-3 shadow rounded">
                                <div className="col-12 d-flex">
                                    <div>
                                        <img className="img-fluid rounded-circle" src={`https://picsum.photos/seed/${post.userId}/100`} />
                                    </div>
                                    <div className="px-3">
                                        <small>Author:</small>
                                        <h4 className="m-0">{user.name}</h4>
                                        <h6 className="m-0">{user.company?.name}</h6>
                                        <p className="font-italic">{user.email}</p>
                                    </div>
                                </div>
                            </div>
                            )
                        )
                    }
                    

                    {
                        ( comments && (
                            <div className="row p-4 mt-3 shadow rounded">
                                <div className="col-12 py-3">
                                    <h2>Comments:</h2>
                                </div>
                                {comments.map(comment => {
                                    return (
                                        <div className=" card p-4 my-2 col-12">
                                            <p className="font-weight-bold">
                                                {comment.name} <br/>
                                                <small>{comment.email}</small>
                                            </p>
                                            <p>{comment.body}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        )) || ''
                    }
                    
                </>
            )) 
            ||
            (
                <>
                    LOADING...
                </>
            )
            }
        </StandardTemplate>
    )
}
