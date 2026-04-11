'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ja">
      <body className="flex min-h-screen items-center justify-center bg-white text-center font-sans">
        <div>
          <h1 className="text-2xl font-bold">エラーが発生しました</h1>
          <p className="mt-3 text-gray-600">申し訳ございません。時間をおいて再度お試しください。</p>
          <button onClick={reset} className="mt-6 rounded-lg bg-black px-4 py-2 text-white">
            もう一度試す
          </button>
        </div>
      </body>
    </html>
  );
}
