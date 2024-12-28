import { createEvent, supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export async function handleGenerateImages(slidesContent, setSlidesContent, setLoading) {
  setLoading(true);
  try {
    const updatedSlides = await Promise.all(
      slidesContent.map(async (slide, index) => {
        const imageUrl = await createEvent('generate_image', {
          prompt: `Image for slide ${index + 1}: ${slide.content}`,
        });
        return { ...slide, image: imageUrl };
      })
    );
    setSlidesContent(updatedSlides);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating images:', error);
  } finally {
    setLoading(false);
  }
}