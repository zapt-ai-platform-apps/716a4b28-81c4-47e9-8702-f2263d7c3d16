import { Show } from 'solid-js';
import SlideContentInput from './SlideContentInput';
import DownloadButtons from './DownloadButtons';

export default function SlidesInput(props) {
  return (
    <Show when={props.slidesContent().length > 0}>
      <div class="mt-6 space-y-4">
        <SlideContentInput slidesContent={props.slidesContent} handleSlideContentChange={props.handleSlideContentChange} />
        <button
          onClick={props.handleGenerateImages}
          class={`w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
            props.loading() ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={props.loading()}
        >
          {props.loading() ? 'Generating Images...' : 'Generate Images'}
        </button>
        <DownloadButtons
          handleDownloadPPTX={props.handleDownloadPPTX}
          handleDownloadWord={props.handleDownloadWord}
          handleDownloadPDF={props.handleDownloadPDF}
          loading={props.loading}
        />
      </div>
    </Show>
  );
}