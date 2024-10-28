import wiki from 'wikipedia';
import DOMPurify from "isomorphic-dompurify";

async function fetchWikipediaArticle() {
  try {
    const page = await wiki.page('Batman');
    const summary = await page.summary();
    const html = await page.html();
    return html;
  } catch (error) {
    console.log(error);
  }
}

export default async function Home() {
  const page = await fetchWikipediaArticle();
  console.log(page);
  // Sanitize HTML to prevent XSS
  const cleanedPage = DOMPurify.sanitize(page);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <label className="input input-bordered flex items-center gap-2">
          <input type="text" className="grow" placeholder="Search a topic" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
        <div dangerouslySetInnerHTML={{ __html: cleanedPage }}></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
