import { createSignal } from 'solid-js';

export default function TopicsInput(props) {
  const { topics, setTopics } = props;
  const [isListening, setIsListening] = createSignal(false);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Sorry, your browser does not support speech recognition.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTopics(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error', event);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  return (
    <div class="flex items-center">
      <input
        type="text"
        placeholder="Topics (comma separated)"
        value={topics()}
        onInput={(e) => setTopics(e.target.value)}
        class="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent box-border text-gray-800 cursor-pointer"
        required
      />
      <button
        type="button"
        onClick={startListening}
        class={`ml-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${isListening() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isListening()}
      >
        {isListening() ? 'Listening...' : '🎤'}
      </button>
    </div>
  );
}