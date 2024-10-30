import * as deepl from 'deepl-node';
import DOMPurify from 'isomorphic-dompurify';
import Link from 'next/link';
import wiki from 'wikipedia';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { topic } = await searchParams;

  let wikiError = false;
  let summaryPage = null;
  try {
    if (topic) {
      const summary = await wiki.summary(topic);
      summaryPage = DOMPurify.sanitize(summary.extract_html);
    } else {
      throw new Error();
    }
  } catch {
    wikiError = true;
  }

  const DEEPL_API_KEY = process.env.DEEPL_API_KEY ?? '';
  const translator = new deepl.Translator(DEEPL_API_KEY);
  let translatorError = false;

  let sourceLanguages = null;
  try {
    sourceLanguages = await translator.getSourceLanguages();
  } catch {
    translatorError = true;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!wikiError && summaryPage && (
        <div
          className="w-4/12"
          data-testid="summary"
          dangerouslySetInnerHTML={{ __html: summaryPage }}
        />
      )}
      {!wikiError && !translatorError && (
        <div className="mt-8 flex space-x-4">
          <div className="dropdown dropdown-bottom">
            <div tabIndex={0} role="button" className="btn m-1">
              Translate
            </div>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              {sourceLanguages &&
                sourceLanguages.slice(0, 5).map((lang) => (
                  <Link
                    className="btn mx-2 my-1"
                    key={lang.code}
                    href={`/search/${lang.code}/${topic}`}
                    data-testid="language-select-option"
                  >
                    {lang.name}({lang.code})
                  </Link>
                ))}
            </ul>
          </div>
        </div>
      )}
      {wikiError && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span>An error occured fetching Wikipedia content</span>
          </div>
        </div>
      )}
      {translatorError && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span>An error occured fetching translatable languages</span>
          </div>
        </div>
      )}
    </div>
  );
}
