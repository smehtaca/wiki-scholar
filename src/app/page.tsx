import wiki, { summary } from 'wikipedia';
import DOMPurify from "isomorphic-dompurify";

export default async function Home() {

  async function fetchWikipediaArticle(searchTopic: string) {
    try {
      const page = await wiki.page(searchTopic);
      const summary = await page.html();
      return DOMPurify.sanitize(summary);
    } catch (error) {
      console.log(error);
    }
  }

  const currentPage = await fetchWikipediaArticle('batman');

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Main Content:
        <div className="w-1/2 md:w-full" dangerouslySetInnerHTML={{ __html: currentPage }}></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
