import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h1 className="mb-2 mt-0 text-5xl font-medium leading-tight text-error">Not Found</h1>
      <Link href="/">Return Home</Link>
    </div>
  )
}