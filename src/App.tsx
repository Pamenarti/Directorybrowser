import './index.css';

import { ChartBarIcon, CheckCircleIcon, ExclamationCircleIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment, memo, useCallback, useState } from 'react';

// Statistics Card Component
const StatCard = memo(({ title, value, icon: Icon, color }: { title: string; value: string | number; icon: any; color: string }) => (
  <div className="bg-dark-800 rounded-lg shadow-lg p-6 border border-dark-700">
    <div className="flex items-center">
      <div className={`rounded-full p-3 ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <h3 className="text-sm font-medium text-dark-300">{title}</h3>
        <p className="mt-1 text-xl font-semibold text-white">{value}</p>
      </div>
    </div>
  </div>
));

// URL Detail Modal Component
const UrlDetailModal = memo(({ isOpen, onClose, url }: { isOpen: boolean; onClose: () => void; url: string }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-dark-800 p-6 shadow-xl transition-all border border-dark-700">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-white">
                  URL Details
                </Dialog.Title>
                <div className="mt-4">
                  <p className="text-sm text-dark-300 break-all">{url}</p>
                </div>
                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    className="btn-primary"
                    onClick={onClose}
                  >
                    Close
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
});

// URL List Component
const UrlList = memo(({ urls, onUrlClick }: { urls: string[]; onUrlClick: (url: string) => void }) => {
  if (urls.length === 0) return null;

  const handleOpenUrl = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCopyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
    } catch (err) {
      console.error('Error copying URL:', err);
    }
  };

  return (
    <div className="mt-6">
      <div className="overflow-hidden shadow-lg ring-1 ring-dark-700 rounded-lg bg-dark-800">
        <table className="min-w-full divide-y divide-dark-700">
          <thead className="bg-dark-900">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-dark-300">URL</th>
              <th scope="col" className="px-3 py-3.5 text-right text-sm font-semibold text-dark-300">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-dark-700">
            {urls.map((url, index) => (
              <tr key={index} className="hover:bg-dark-700/50">
                <td className="py-4 pl-4 pr-3 text-sm">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="truncate max-w-lg text-dark-200" title={url}>{url}</span>
                  </div>
                </td>
                <td className="px-3 py-4 text-sm text-right">
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => handleCopyUrl(url)}
                      className="text-primary-400 hover:text-primary-300 flex items-center transition-colors"
                      title="Copy URL"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184" />
                      </svg>
                      Copy
                    </button>
                    <button
                      onClick={() => onUrlClick(url)}
                      className="text-primary-400 hover:text-primary-300 transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => handleOpenUrl(url)}
                      className="text-green-500 hover:text-green-400 flex items-center transition-colors"
                    >
                      <GlobeAltIcon className="h-4 w-4 mr-1" />
                      Open
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

function App() {
  const [domain, setDomain] = useState('');
  const [workingUrls, setWorkingUrls] = useState<string[]>([]);
  const [totalUrls, setTotalUrls] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  const checkUrl = useCallback(async (url: string) => {
    try {
      const response = await fetch(url, {
        method: 'HEAD',
        mode: 'no-cors'
      });
      return response.type === 'opaque';
    } catch {
      return false;
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!domain) {
      setError('Please enter a domain');
      return;
    }

    setError('');
    setLoading(true);
    setWorkingUrls([]); // Clear previous results
    setTotalUrls(0);

    try {
      const response = await fetch(
        `https://web.archive.org/cdx/search/cdx?url=*.${domain}/*&collapse=urlkey&output=json&fl=original`,
        {
          method: 'GET',
          mode: 'cors'
        }
      );

      if (!response.ok) {
        throw new Error('API did not respond');
      }

      const data = await response.json();
      
      if (!data || data.length <= 1) {
        setError('No directories found for this domain');
        return;
      }

      const urls = data.slice(1).map((item: any) => item[0]);
      setTotalUrls(urls.length);
      const workingUrlsList: string[] = [];
      
      // Process URLs in batches of 5
      const batchSize = 5;
      
      for (let i = 0; i < urls.length; i += batchSize) {
        const batch = urls.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (url: string) => ({
            url,
            working: await checkUrl(url)
          }))
        );
        
        const workingBatchUrls = batchResults
          .filter(result => result.working)
          .map(result => result.url);
        
        workingUrlsList.push(...workingBatchUrls);
        setWorkingUrls([...workingUrlsList]); // Update UI after each batch
      }
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred while fetching directories');
    } finally {
      setLoading(false);
    }
  }, [domain, checkUrl]);

  return (
    <div className="min-h-screen bg-dark-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <GlobeAltIcon className="mx-auto h-12 w-12 text-primary-500" />
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            Web Directory Scanner
          </h1>
          <p className="mt-2 text-dark-300">
            Enter a domain name to find working web directories
          </p>
        </div>

        {/* Statistics Cards */}
        {(totalUrls > 0 || workingUrls.length > 0) && (
          <div className="mt-8 p-6 bg-dark-800 rounded-lg shadow-lg border border-dark-700">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center">
              <ChartBarIcon className="h-5 w-5 mr-2 text-primary-500" />
              Scan Statistics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <StatCard
                title="Scanned Website"
                value={domain}
                icon={GlobeAltIcon}
                color="bg-blue-600"
              />
              <StatCard
                title="Total URLs"
                value={totalUrls}
                icon={ChartBarIcon}
                color="bg-purple-600"
              />
              <StatCard
                title="Working URLs"
                value={workingUrls.length}
                icon={CheckCircleIcon}
                color="bg-green-600"
              />
              <StatCard
                title="Not Working"
                value={totalUrls - workingUrls.length}
                icon={ExclamationCircleIcon}
                color="bg-red-600"
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <div className="flex gap-2 max-w-xl mx-auto">
            <input
              type="text"
              placeholder="e.g. example.com"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="flex-1 px-3 py-1.5 bg-dark-800 border border-dark-700 rounded-md text-sm text-white placeholder-dark-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="px-4 py-1.5 bg-primary-600 text-white text-sm rounded-md font-medium hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-dark-900 disabled:bg-primary-800 disabled:cursor-not-allowed transition-colors"
            >
              {loading ? 'Scanning...' : 'Scan'}
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-md bg-red-900/50 border border-red-700 p-4">
              <div className="flex">
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <div className="ml-3">
                  <p className="text-sm text-red-400">{error}</p>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <div className="mt-8 text-center">
              <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-primary-400">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Scanning directories...
              </div>
            </div>
          )}

          <UrlList
            urls={workingUrls}
            onUrlClick={(url) => setSelectedUrl(url)}
          />
        </div>
      </div>

      <UrlDetailModal
        isOpen={!!selectedUrl}
        onClose={() => setSelectedUrl(null)}
        url={selectedUrl || ''}
      />
    </div>
  );
}

export default App;