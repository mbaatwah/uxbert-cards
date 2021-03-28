import StandardTemplate from '../templates/standardTemplate';
import Link from 'next/link'

export default function Home() {
    return (
        <StandardTemplate pageTitle="Test">
            <div className="row no-gutters">
                <div className="col text-center mt-5 py-3">
                    <p className="h4">See The Latest Posts</p>
                </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <Link href="/posts"><a className="btn-lg btn-primary">Posts</a></Link>
              </div>
            </div>
        </StandardTemplate>
    )
}
