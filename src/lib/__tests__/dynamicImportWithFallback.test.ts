import { describe, it, expect, vi } from 'vitest';
import { dynamicImportWithFallback } from '../dynamicImportWithFallback';

describe('dynamicImportWithFallback', () => {
  it('returns the module when import succeeds', async () => {
    const mockComponent = () => <div>Mock</div>;
    const importFn = vi.fn().mockResolvedValue({ default: mockComponent });

    const result = await dynamicImportWithFallback(importFn);

    expect(result.default).toBe(mockComponent);
    expect(importFn).toHaveBeenCalledOnce();
  });

  it('returns noop component when import fails (404)', async () => {
    const importFn = vi.fn().mockRejectedValue(new Error('404 Not Found'));

    const result = await dynamicImportWithFallback(importFn);

    // Noop component should render nothing
    expect(result.default).toBeInstanceOf(Function);
    expect(result.default()).toBeNull();
  });

  it('logs a warning when import fails', async () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const importFn = vi.fn().mockRejectedValue(new Error('Module not found'));

    await dynamicImportWithFallback(importFn);

    expect(consoleWarn).toHaveBeenCalledWith(
      expect.stringContaining('[dynamicImportWithFallback]'),
      expect.any(String)
    );

    consoleWarn.mockRestore();
  });

  it('handles non-Error rejection objects gracefully', async () => {
    const consoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const importFn = vi.fn().mockRejectedValue('String error');

    const result = await dynamicImportWithFallback(importFn);

    expect(consoleWarn).toHaveBeenCalled();
    expect(result.default()).toBeNull();

    consoleWarn.mockRestore();
  });
});
