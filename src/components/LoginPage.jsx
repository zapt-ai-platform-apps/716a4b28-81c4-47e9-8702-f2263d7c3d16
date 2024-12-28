import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../supabaseClient';

function LoginPage() {
  return (
    <div class="flex items-center justify-center h-full">
      <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg box-border">
        <h2 class="text-3xl font-bold mb-6 text-center text-purple-600 cursor-pointer">Sign in with ZAPT</h2>
        <a
          href="https://www.zapt.ai"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 hover:underline mb-6 block text-center cursor-pointer"
        >
          Learn more about ZAPT
        </a>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['google', 'facebook', 'apple']}
          magicLink={true}
          view="magic_link"
          showLinks={false}
        />
      </div>
    </div>
  );
}

export default LoginPage;