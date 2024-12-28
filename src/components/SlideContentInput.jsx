import { For } from 'solid-js';

export default function SlideContentInput(props) {
  return (
    <For each={props.slidesContent()}>
      {(slide, index) => (
        <div class="flex flex-col">
          <label class="mb-2 text-gray-700 cursor-pointer">Slide {index() + 1} Content:</label>
          <textarea
            rows="3"
            value={slide.content}
            onInput={(e) => props.handleSlideContentChange(index(), e.target.value)}
            class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800 cursor-pointer"
            required
          ></textarea>
        </div>
      )}
    </For>
  );
}