import { createSignal } from 'solid-js';

export default function PresentationSlide({ slide, index }) {
  const [content, setContent] = createSignal(slide.content);
  const [image, setImage] = createSignal(slide.image);

  return (
    <div class="border p-4 rounded-lg mb-4">
      <h4 class="text-lg font-semibold mb-2">Slide {index + 1}</h4>
      <p class="mb-2 text-gray-800">{content()}</p>
      {image() && <img src={image()} alt={`Slide ${index + 1}`} class="w-full h-48 object-cover rounded-lg" />}
    </div>
  );
}