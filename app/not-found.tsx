import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col gap-4 text-center px-4">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="text-gray-600 dark:text-gray-400">Page not found</p>
      <Link href="/" className="btn-primary">Go Home</Link>
    </div>
  );
}
