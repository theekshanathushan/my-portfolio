import { useState, useEffect, useCallback } from 'react';

/**
 * Format relative time elapsed from an ISO timestamp
 */
export function formatTimeAgo(isoString) {
  if (!isoString) return '';
  const date = new Date(isoString);
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return 'just now';
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 30) return `${diffDays}d ago`;
  const diffMonths = Math.floor(diffDays / 30);
  return `${diffMonths}mo ago`;
}

/**
 * Custom hook to fetch GitHub activity from /api/activity
 */
export function useActivity() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchIndex, setFetchIndex] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    fetch('/api/activity', {
      headers: {
        'Accept': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Failed to load activity (HTTP ${res.status})`);
        }
        return res.json();
      })
      .then((json) => {
        if (!isCancelled) {
          setData(json);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load GitHub activity');
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [fetchIndex]);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    setFetchIndex((prev) => prev + 1);
  }, []);

  const lastUpdatedAgo = data?.updatedAt ? formatTimeAgo(data.updatedAt) : '';
  const isFallback = Boolean(data?.isFallback);

  return {
    data,
    loading,
    error,
    refetch,
    lastUpdatedAgo,
    isFallback
  };
}

export default useActivity;
