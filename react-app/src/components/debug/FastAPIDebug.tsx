// src/components/debug/FastAPIDebug.tsx
import React, { useState, useEffect } from 'react';
import { config, checkFastAPIHealth, getAgentStreamUrl } from '../../config/environment';

export const FastAPIDebug: React.FC = () => {
  const [healthStatus, setHealthStatus] = useState<'checking' | 'healthy' | 'unhealthy'>('checking');
  const [testQuery, setTestQuery] = useState('Can you find the capitol office address for a legislator?');
  const [testResponse, setTestResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check FastAPI health on component mount
    checkHealth();
  }, []);

  const checkHealth = async () => {
    setHealthStatus('checking');
    const isHealthy = await checkFastAPIHealth();
    setHealthStatus(isHealthy ? 'healthy' : 'unhealthy');
  };

  const testAgentEndpoint = async () => {
    setIsLoading(true);
    setTestResponse('');

    try {
      const response = await fetch(getAgentStreamUrl(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: testQuery,
          thread_id: 'debug-test'
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('No response body');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const jsonStr = line.slice(6);
              if (jsonStr.trim() === '') continue;

              const data = JSON.parse(jsonStr);
              fullResponse += `[${data.type}] ${data.content}\n\n`;
            } catch (e) {
              fullResponse += `[RAW] ${line}\n`;
            }
          }
        }
      }

      setTestResponse(fullResponse || 'No response received');
    } catch (error) {
      setTestResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const getHealthStatusColor = () => {
    switch (healthStatus) {
      case 'healthy': return 'text-green-600';
      case 'unhealthy': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getHealthStatusText = () => {
    switch (healthStatus) {
      case 'healthy': return '✅ Healthy';
      case 'unhealthy': return '❌ Unhealthy';
      default: return '🔄 Checking...';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 m-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        FastAPI Connection Debug
      </h3>

      {/* Configuration Display */}
      <div className="mb-4 p-3 bg-gray-50 rounded">
        <h4 className="font-medium text-gray-700 mb-2">Current Configuration:</h4>
        <div className="text-sm space-y-1">
          <div><strong>Base URL:</strong> {config.FASTAPI_BASE_URL}</div>
          <div><strong>Agent Endpoint:</strong> {getAgentStreamUrl()}</div>
          <div><strong>Environment:</strong> {import.meta.env.MODE}</div>
        </div>
      </div>

      {/* Health Check */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-gray-700">Health Status:</span>
          <span className={getHealthStatusColor()}>{getHealthStatusText()}</span>
        </div>
        <button
          onClick={checkHealth}
          className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm"
        >
          Refresh
        </button>
      </div>

      {/* Agent Test */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-700">Test Agent Endpoint:</h4>

        <div>
          <label className="block text-sm text-gray-600 mb-1">Test Query:</label>
          <textarea
            value={testQuery}
            onChange={(e) => setTestQuery(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            rows={2}
          />
        </div>

        <button
          onClick={testAgentEndpoint}
          disabled={isLoading || healthStatus === 'unhealthy'}
          className={`px-4 py-2 rounded text-sm font-medium ${
            isLoading || healthStatus === 'unhealthy'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-teal-700 text-white hover:bg-teal-800'
          }`}
        >
          {isLoading ? 'Testing...' : 'Test Agent'}
        </button>

        {testResponse && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Response:</label>
            <pre className="bg-gray-900 text-green-400 p-3 rounded text-xs overflow-auto max-h-64">
              {testResponse}
            </pre>
          </div>
        )}
      </div>

      {/* Instructions */}
      <div className="mt-4 p-3 bg-blue-50 rounded">
        <h4 className="font-medium text-blue-800 mb-2">Setup Instructions:</h4>
        <div className="text-sm text-blue-700 space-y-1">
          <div>1. Make sure FastAPI is running on port 8000</div>
          <div>2. Check that the /agent/stream endpoint is available</div>
          <div>3. Verify CORS is configured to allow frontend requests</div>
          <div>4. Test with a simple query to ensure the agent responds</div>
        </div>
      </div>
    </div>
  );
};