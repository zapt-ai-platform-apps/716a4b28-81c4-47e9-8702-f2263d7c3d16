import { Document, Packer, Paragraph, TextRun } from 'docx';
import { saveAs } from 'file-saver';
import { createEvent } from '../supabaseClient';
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

export async function handleDownload(title, slidesContent, setLoading) {
  setLoading(true);
  try {
    const doc = new Document();

    doc.addSection({
      children: [
        new Paragraph({
          text: title,
          heading: 'Heading1',
        }),
        ...slidesContent.map((slide) =>
          new Paragraph({
            children: [
              new TextRun({
                text: slide.content,
                bold: true,
              }),
            ],
          })
        ),
      ],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${title}.pptx`);
  } catch (error) {
    Sentry.captureException(error);
    console.error('Error generating presentation:', error);
  } finally {
    setLoading(false);
  }
}