"use client";

import DOMPurify from "isomorphic-dompurify";
import wiki from 'wikipedia';
import { useNavbarContext } from "./GlobalProvider";

  async function fetchWikipediaArticle(searchTopic: string) {
    try {
      const page = await wiki.page(searchTopic);
      const summary = await page.summary();
      return DOMPurify.sanitize(summary.extract_html);
    } catch (error) {
      console.log(error);
    }
  }

export default async function Home() {

  const searchTopic = useNavbarContext();
  const currentPage = await fetchWikipediaArticle(searchTopic);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        Main Content:
        {currentPage && <div className="w-1/2 md:w-full" data-testid="summary" dangerouslySetInnerHTML={{ __html: currentPage }}></div> }
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
