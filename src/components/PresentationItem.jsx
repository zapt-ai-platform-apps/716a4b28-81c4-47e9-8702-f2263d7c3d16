export default function PresentationItem(props) {
  const { presentation, handleDelete } = props;

  return (
    <div class="p-4 border border-gray-300 rounded-lg mb-4 flex justify-between items-center">
      <div>
        <h3 class="text-xl font-semibold">{presentation.title}</h3>
        <p class="text-gray-600">Slides: {presentation.slides_count}</p>
      </div>
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded cursor-pointer"
        onClick={() => handleDelete(presentation.id)}
      >
        Delete
      </button>
    </div>
  );
}