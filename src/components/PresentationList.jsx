import { createSignal, onMount, Show, For } from 'solid-js';
import { supabase } from '../supabaseClient';
import Sentry from '@sentry/browser';
import PresentationItem from './PresentationItem';

export default function PresentationList() {
  const [presentations, setPresentations] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchPresentations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('presentations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        Sentry.captureException(error);
        console.error('Error fetching presentations:', error);
      } else {
        setPresentations(data);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error fetching presentations:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchPresentations();
  });

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('presentations')
        .delete()
        .eq('id', id);

      if (error) {
        Sentry.captureException(error);
        console.error('Error deleting presentation:', error);
      } else {
        setPresentations(presentations().filter(p => p.id !== id));
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error deleting presentation:', error);
    }
  };

  return (
    <div class="bg-white p-6 rounded-lg shadow-md box-border mt-6">
      <h2 class="text-2xl font-bold mb-4 text-purple-600 cursor-pointer">Your Presentations</h2>
      <Show when={!loading()} fallback={<p class="text-gray-700">Loading presentations...</p>}>
        <Show
          when={presentations().length > 0}
          fallback={<p class="text-gray-700">You have no presentations yet.</p>}
        >
          <For each={presentations()}>
            {(presentation) => (
              <PresentationItem presentation={presentation} handleDelete={handleDelete} />
            )}
          </For>
        </Show>
      </Show>
    </div>
  );
}