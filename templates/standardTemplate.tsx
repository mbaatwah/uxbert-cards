import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

export default function StandardTemplate({children, pageTitle=''}: {children: any, pageTitle: string}){
    return (
        <div className="container">
            <Head key={1}>
                <title>{pageTitle} | CardApp</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <header className="text-center pt-5">
                <img height={75}  src="https://assets.umod.org/images/icons/plugin/5d3c47cfdd068.png" />
                <nav className="nav py-2 justify-content-center">
                    <a className="nav-link" href="/">Home</a>
                    <a className="nav-link" href="/posts">Posts</a>
                    <a className="nav-link" href="/about">About</a>
                </nav>
            </header>
            <main style={{minHeight: '50vh'}}>
                {children}
            </main>
            <footer>
                <div className="row mt-4 d-flex align-justify-left">
                    <ul className="text-left">
                        <li className="p-1 d-block"><Link href="/">Home</Link></li>
                        <li className="p-1 d-block"><Link href="/posts">Posts</Link></li>
                        <li className="p-1 d-block"><Link href="/about">About</Link></li>
                    </ul>

                    <ul className="text-left">
                        <li className="p-1 d-block">Terms & Conditions</li>
                        <li className="p-1 d-block">Privacy Policy</li>
                    </ul>
                    
                    <ul className="text-center ml-auto px-4">
                        <li className="p-1 d-block">Facebook</li>
                        <li className="p-1 d-block">Twitter</li>
                        <li className="p-1 d-block">Linkedin</li>
                    </ul>
                    
                </div>
                <div className="row no-gutters">
                    <div className="col-12 ">
                        <p className="rounded bg-dark text-light text-center p-2">Copyrights Reserved &copy; {new Date().getFullYear()}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}