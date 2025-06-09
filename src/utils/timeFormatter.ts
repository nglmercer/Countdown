/**
 * Time formatting utilities
 */

export function formatTime(totalSeconds: number): string {
  if (typeof totalSeconds !== 'number' || isNaN(totalSeconds) || totalSeconds < 0) {
    return '00:00';
  }
  
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function parseTimeDisplay(timeString: string): { minutes: number; seconds: number } {
  const [minutesStr, secondsStr] = timeString.split(':');
  return {
    minutes: parseInt(minutesStr, 10) || 0,
    seconds: parseInt(secondsStr, 10) || 0
  };
}