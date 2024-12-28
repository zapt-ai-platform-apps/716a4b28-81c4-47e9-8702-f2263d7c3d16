import { createSignal } from 'solid-js';
import TopicsInput from './TopicsInput.jsx';

export default function PresentationFormInputs(props) {
  const { title, setTitle, numSlides, setNumSlides, handleAddSlides, loading } = props;
  const [topics, setTopics] = createSignal('');

  return (
    <form class="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAddSlides(); }}>
      <input
        type="text"
        placeholder="Presentation Title"
        value={title()}
        onInput={(e) => setTitle(e.target.value)}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800 cursor-pointer"
        required
      />
      <TopicsInput topics={topics} setTopics={setTopics} />
      <input
        type="number"
        placeholder="Number of Slides"
        value={numSlides()}
        onInput={(e) => setNumSlides(parseInt(e.target.value))}
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800 cursor-pointer"
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
  );
}