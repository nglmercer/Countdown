/**
 * Utility functions for URL parameter handling
 */

export function getTimerIdFromQuery(): string {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('timer') || '1';
}

export function updateUrlWithTimerId(timerId: string): void {
  const url = new URL(window.location.href);
  url.searchParams.set('timer', timerId);
  window.history.replaceState({}, '', url.toString());
}