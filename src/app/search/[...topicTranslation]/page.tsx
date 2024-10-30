import wiki from 'wikipedia';
import * as deepl from 'deepl-node';

export default async function TranslatedPage({
  params,
}: {
  params: Promise<{ topicTranslation: string[] }>;
}) {
  const { topicTranslation } = await params;

  const DEEPL_API_KEY = process.env.DEEPL_API_KEY ?? '';
  const translator = new deepl.Translator(DEEPL_API_KEY);
  const translationLang = topicTranslation[0] || 'en-GB';
  let translationError = false;

  let translatedSummary = null;
  try {
    const summary = await wiki.summary(topicTranslation[1]);
    translatedSummary = await translator.translateText(
      summary.extract,
      null,
      translationLang as deepl.TargetLanguageCode,
    );
  } catch {
    translationError = true;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      {!translationError && translatedSummary && (
        <div className="w-4/12" data-testid="translated-summary">
          {translatedSummary.text}
        </div>
      )}
      {translationError && (
        <div className="toast toast-end">
          <div className="alert alert-error">
            <span>An error occured during translation</span>
          </div>
        </div>
      )}
    </div>
  );
}
