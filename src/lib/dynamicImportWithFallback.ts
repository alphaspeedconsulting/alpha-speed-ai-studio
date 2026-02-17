/**
 * Safely import optional modules that may not exist at build time.
 *
 * Problem: When a module doesn't exist (e.g., ai-assistant-local is not installed),
 * Vite creates a virtual stub module and chunks it separately. On platforms that
 * only serve static files (GitHub Pages), this chunk 404s and crashes the app.
 *
 * Solution: Use a dynamic import with fallback that catches 404s at runtime
 * and returns a noop component instead of crashing.
 */

import type { ComponentType } from 'react';

/**
 * Safely load a module that may not exist. Returns a noop component if loading fails.
 *
 * @param importFn - The dynamic import function (e.g., () => import('@alphaai/Routes'))
 * @returns Promise that resolves to { default: ComponentType } or { default: noop }
 */
export async function dynamicImportWithFallback(
  importFn: () => Promise<{ default: ComponentType<any> }>
): Promise<{ default: ComponentType<any> }> {
  try {
    return await importFn();
  } catch (error) {
    // Log the error for observability, but don't crash the app
    console.warn(
      '[dynamicImportWithFallback] Failed to load optional module:',
      error instanceof Error ? error.message : String(error)
    );

    // Return a noop component that renders nothing
    return {
      default: () => null,
    };
  }
}
