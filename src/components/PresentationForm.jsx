import { createSignal } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
import * as Sentry from '@sentry/browser';
import SlidesInput from './SlidesInput';

export default function PresentationForm() {
  const navigate = useNavigate();
  const [title, setTitle] = createSignal('');
  const [numSlides, setNumSlides] = createSignal(1);
  const [slidesContent, setSlidesContent] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const handleAddSlides = () => {
    const slides = [];
    for (let i = 0; i < numSlides(); i++) {
      slides.push({ content: '', image: '' });
    }
    setSlidesContent(slides);
  };

  const handleSlideContentChange = (index, content) => {
    const updatedSlides = slidesContent().slice();
    updatedSlides[index].content = content;
    setSlidesContent(updatedSlides);
  };

  const handleGenerateImages = async () => {
    setLoading(true);
    try {
      const updatedSlides = await Promise.all(
        slidesContent().map(async (slide, index) => {
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
  };

  const handleDownload = async () => {
    setLoading(true);
    try {
      const doc = new Document();

      doc.addSection({
        children: [
          new Paragraph({
            text: title(),
            heading: 'Heading1',
          }),
          ...slidesContent().map((slide) =>
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
      saveAs(blob, `${title()}.pptx`);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error generating presentation:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md box-border">
      <h2 class="text-2xl font-bold mb-4 text-purple-600 cursor-pointer">Create New Presentation</h2>
      <form class="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddSlides(); }}>
        <input
          type="text"
          placeholder="Presentation Title"
          value={title()}
          onInput={(e) => setTitle(e.target.value)}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800"
          required
        />
        <input
          type="number"
          placeholder="Number of Slides"
          value={numSlides()}
          onInput={(e) => setNumSlides(parseInt(e.target.value))}
          class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800"
          min="1"
          required
        />
        <button
          type="submit"
          class="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
          disabled={loading()}
        >
          {loading() ? 'Adding Slides...' : 'Add Slides'}
        </button>
      </form>

      <SlidesInput
        slidesContent={slidesContent}
        handleSlideContentChange={handleSlideContentChange}
        loading={loading}
        handleGenerateImages={handleGenerateImages}
        handleDownload={handleDownload}
      />
    </div>
  );
}