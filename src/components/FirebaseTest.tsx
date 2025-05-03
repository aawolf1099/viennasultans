'use client';

import { useFirebase } from '@/lib/firebase/useFirebase';
import { useEffect, useState } from 'react';

interface DebugInfo {
  timestamp: string;
  status: 'connected' | 'error';
  environment: string;
  error?: string;
}

const FirebaseTest = () => {
  const { getCollection } = useFirebase();
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [debugInfo, setDebugInfo] = useState<DebugInfo | null>(null);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // Try to get a collection to test the connection
        await getCollection('test');
        setConnectionStatus('connected');
        setDebugInfo({
          timestamp: new Date().toISOString(),
          status: 'connected',
          environment: process.env.NODE_ENV,
        });
      } catch (error) {
        setConnectionStatus('error');
        setErrorMessage(error instanceof Error ? error.message : 'Unknown error occurred');
        setDebugInfo({
          timestamp: new Date().toISOString(),
          status: 'error',
          error: error instanceof Error ? error.message : 'Unknown error',
          environment: process.env.NODE_ENV,
        });
      }
    };

    checkConnection();
  }, [getCollection]);

  return (
    <div className="p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
      <h2 className="text-xl font-bold mb-4">Firebase Connection Status</h2>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Status:</p>
          <span
            className={`inline-block px-2 py-1 rounded ${
              connectionStatus === 'connected'
                ? 'bg-green-100 text-green-800'
                : connectionStatus === 'error'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {connectionStatus.toUpperCase()}
          </span>
        </div>

        {errorMessage && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
            <p className="text-red-600 dark:text-red-400 text-sm">{errorMessage}</p>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded">
          <h3 className="font-bold mb-2">Debug Information:</h3>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded">
          <h3 className="font-bold mb-2">Environment:</h3>
          <p className="text-sm">
            NODE_ENV: {process.env.NODE_ENV}
          </p>
          <p className="text-sm">
            Project ID: {process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'Not set'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FirebaseTest; 