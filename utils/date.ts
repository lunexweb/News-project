/**
 * Format date consistently for server and client rendering
 * Avoids hydration mismatches by using a fixed format
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  
  // Use ISO format (YYYY-MM-DD) or a consistent format that works on both server and client
  // Format: DD/MM/YYYY (consistent across environments)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  return `${day}/${month}/${year}`;
}

/**
 * Format date with time for fixtures
 */
export function formatDateTime(dateString: string, timeString?: string): string {
  const formatted = formatDate(dateString);
  return timeString ? `${formatted} ${timeString}` : formatted;
}

