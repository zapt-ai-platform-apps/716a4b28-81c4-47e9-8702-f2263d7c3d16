import { Show, For } from 'solid-js';

export default function SlidesInput(props) {
  return (
    <Show when={props.slidesContent().length > 0}>
      <div class="mt-6 space-y-4">
        <For each={props.slidesContent()}>
          {(slide, index) => (
            <div class="flex flex-col">
              <label class="mb-2 text-gray-700 cursor-pointer">Slide {index() + 1} Content:</label>
              <textarea
                rows="3"
                value={slide.content}
                onInput={(e) => props.handleSlideContentChange(index(), e.target.value)}
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800"
                required
              ></textarea>
            </div>
          )}
        </For>
        <button
          onClick={props.handleGenerateImages}
          class={`w-full px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={props.loading()}
        >
          {props.loading() ? 'Generating Images...' : 'Generate Images'}
        </button>
        <button
          onClick={props.handleDownload}
          class={`w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={props.loading()}
        >
          {props.loading() ? 'Downloading...' : 'Download as PPTX'}
        </button>
      </div>
    </Show>
  );
}