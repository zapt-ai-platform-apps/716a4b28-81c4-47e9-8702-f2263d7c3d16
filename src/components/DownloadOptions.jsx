import { Show } from 'solid-js';

export default function DownloadOptions(props) {
  return (
    <div class="flex space-x-4 mt-4">
      <button
        onClick={props.handleDownloadPPTX}
        class={`flex-1 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={props.loading()}
      >
        {props.loading() ? 'Downloading PPTX...' : 'Download as PPTX'}
      </button>
      <button
        onClick={props.handleDownloadWord}
        class={`flex-1 px-6 py-3 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={props.loading()}
      >
        {props.loading() ? 'Downloading Word...' : 'Download as Word'}
      </button>
      <button
        onClick={props.handleDownloadPDF}
        class={`flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${props.loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={props.loading()}
      >
        {props.loading() ? 'Downloading PDF...' : 'Download as PDF'}
      </button>
    </div>
  );
}