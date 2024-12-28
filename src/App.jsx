import { createSignal, onMount, createEffect, Show } from 'solid-js';
import { Router, Routes, Route } from '@solidjs/router';
import { supabase } from './supabaseClient';
import PresentationForm from './components/PresentationForm';
import PresentationList from './components/PresentationList';
import Header from './components/Header';
import LoginPage from './components/LoginPage';

function App() {
  const [user, setUser] = createSignal(null);
  const [currentPage, setCurrentPage] = createSignal('homePage');
  const [loading, setLoading] = createSignal(false);

  const checkUserSignedIn = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      setUser(user);
      setCurrentPage('homePage');
    }
  };

  onMount(checkUserSignedIn);

  createEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        setCurrentPage('homePage');
      } else {
        setUser(null);
        setCurrentPage('login');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCurrentPage('login');
  };

  return (
    <Router>
      <div class="min-h-screen h-full bg-gradient-to-br from-purple-100 to-blue-100 p-4 box-border">
        <Show when={currentPage() === 'homePage'} fallback={<LoginPage />}>
          <div class="max-w-6xl mx-auto h-full">
            <Header handleSignOut={handleSignOut} />

            <Routes>
              <Route path="/" element={<PresentationForm />} />
              <Route path="/presentations" element={<PresentationList />} />
            </Routes>

            <footer class="mt-8 text-center text-gray-600">
              <a
                href="https://www.zapt.ai"
                target="_blank"
                rel="noopener noreferrer"
                class="underline cursor-pointer"
              >
                Made on ZAPT
              </a>
            </footer>
          </div>
        </Show>
      </div>
    </Router>
  );
}

export default App;