import { useMemo, useState, useEffect } from 'react'
import PostsService from '../services/postsService';
import Post from '../models/Post';
import Card from '../components/card';
import StandardTemplate from '../templates/standardTemplate';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as _ from 'lodash';

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [count, setCount] = useState<number>(0);
    const router = useRouter();

    let { page } = router.query

    useMemo(() => {
        PostsService.getAllPosts(+(page || 1))
            .then(res => {
                setPosts(res?.entries || []);
                setCount(res?.count || 0);
            })
            .catch(
                ex => {

                }
            )
    }, [page])

    const lastPage = Math.floor(count / 12);


    return (
        <StandardTemplate pageTitle="Test">
            <div className="row no-gutters">
                {
                    (posts &&
                        posts.map(it => {
                            return (
                                <div className="col-12 col-sm-6 col-lg-4 d-flex align-self-stretch mb-3">
                                    <Link href={`/post/${it.id}`}>
                                        <Card link={`/post/${it.id}`} className="m-2" title={it.title} body={it.body} />
                                    </Link>
                                </div>
                            );
                        })) || 'No Posts'
                }
            </div>
            {
                (count > 0 && (
                <div className="row">
                    <div className="col-12 text-center d-flex justify-content-center">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination justify-content-center">
                                <li className={`page-item ${+(page || 1) == 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href="posts">First</a>
                                </li>

                                <li className={`page-item ${+(page || 1) == 1 ? 'disabled' : ''}`}>
                                    <a className="page-link" href={`posts?page=${+(page || 1) - 1}`}>Previous</a>
                                </li>

                                <li className={`page-item ${+(page || 1) == lastPage ? 'disabled' : ''}`}>
                                    <a className="page-link" href={`posts?page=${+(page || 1) + 1}`}>Next</a>
                                </li>

                                <li className={`page-item ${+(page || 1) == lastPage ? 'disabled' : ''}`}>
                                    <a className="page-link" href={`posts?page=${lastPage}`}>Last</a>
                                </li>
                            </ul>
                        </nav>
                        <div className="mx-3">
                            <span>Go To Page: </span>
                            <select value={+(page || 1)} onChange={e => router.push(`posts?page=${e.target.value}`)} className="form-control d-inline w-auto">
                                {
                                    _.range(1, lastPage + 1).map(
                                        p => <option value={p}>{p}</option>
                                    )
                                }
                            </select>
                        </div>
                    </div>
                </div>
                ) || ''
            )
            }
            
        </StandardTemplate>
    )
}
