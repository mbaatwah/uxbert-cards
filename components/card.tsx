import Link from 'next/link';

export default function Card({className, link, title, body}) {
  return (
    <Link href={link || ''}>
        <div className={"card p-4 rounded shadow " + className + (link ? ' pointable' : '')}>
            <h4>{title}</h4>
            <p>
                {body}
            </p>
        </div>
    </Link>
  )
}
