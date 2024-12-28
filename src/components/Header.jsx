import { Link } from '@solidjs/router';

function Header(props) {
  return (
    <header class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold text-purple-600 cursor-pointer">
        <Link href="/">Presentation Creator</Link>
      </h1>
      <button
        class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer"
        onClick={props.handleSignOut}
      >
        Sign Out
      </button>
    </header>
  );
}

export default Header;