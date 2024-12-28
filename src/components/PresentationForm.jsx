import { createSignal } from 'solid-js';
import PresentationFormInputs from './PresentationFormInputs';
import SlidesInput from './SlidesInput';
import { handleGenerateImages, handleDownloadPPTX, handleDownloadWord, handleDownloadPDF } from '../utils/presentationActions';

export default function PresentationForm() {
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

  const handleGenerateImagesAction = () => {
    handleGenerateImages(slidesContent(), setSlidesContent, setLoading);
  };

  const handleDownloadPPTXAction = () => {
    handleDownloadPPTX(title(), slidesContent(), setLoading);
  };

  const handleDownloadWordAction = () => {
    handleDownloadWord(title(), slidesContent(), setLoading);
  };

  const handleDownloadPDFAction = () => {
    handleDownloadPDF(title(), slidesContent(), setLoading);
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md box-border">
      <h2 class="text-2xl font-bold mb-4 text-purple-600 cursor-pointer">Create New Presentation</h2>
      <PresentationFormInputs
        title={title}
        setTitle={setTitle}
        numSlides={numSlides}
        setNumSlides={setNumSlides}
        handleAddSlides={handleAddSlides}
        loading={loading}
      />
      <SlidesInput
        slidesContent={slidesContent}
        handleSlideContentChange={handleSlideContentChange}
        loading={loading}
        handleGenerateImages={handleGenerateImagesAction}
        handleDownloadPPTX={handleDownloadPPTXAction}
        handleDownloadWord={handleDownloadWordAction}
        handleDownloadPDF={handleDownloadPDFAction}
      />
    </div>
  );
}