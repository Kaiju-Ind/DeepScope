import { JSDOM } from 'jsdom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { copy } from '../../utils/clipboard.ts';

describe('clipboard resource lifetime', () => {
	let window: JSDOM['window'];

	beforeEach(() => {
		window = new JSDOM('<body><textarea id="borrowed">Keep this value</textarea></body>').window;
		vi.stubGlobal('document', window.document);
		vi.stubGlobal('navigator', {});
	});

	afterEach(() => {
		vi.restoreAllMocks();
		vi.unstubAllGlobals();
		window.close();
	});

	it('uses the Clipboard API without creating a fallback element', async () => {
		const writeText = vi.fn().mockResolvedValue(undefined);
		vi.stubGlobal('navigator', { clipboard: { writeText } });
		await copy('Support report');
		expect(writeText).toHaveBeenCalledWith('Support report');
		expect(window.document.querySelectorAll('textarea')).toHaveLength(1);
	});

	it('preserves a Clipboard API rejection without switching to a different permission path', async () => {
		const denied = new Error('Clipboard access denied');
		vi.stubGlobal('navigator', { clipboard: { writeText: vi.fn().mockRejectedValue(denied) } });
		await expect(copy('Support report')).rejects.toBe(denied);
		expect(window.document.querySelectorAll('textarea')).toHaveLength(1);
	});

	it.each([true, false])('removes only its fallback after execCommand returns %s', async (copied) => {
		window.document.execCommand = vi.fn(() => {
			expect(window.document.querySelectorAll('textarea')).toHaveLength(2);
			expect(window.document.querySelector<HTMLTextAreaElement>('textarea:not(#borrowed)')?.value).toBe('Support report');
			return copied;
		});
		if (copied) await copy('Support report');
		else await expect(copy('Support report')).rejects.toThrow('Browser clipboard access is unavailable.');
		expect(window.document.execCommand).toHaveBeenCalledWith('copy');
		expect(window.document.querySelectorAll('textarea')).toHaveLength(1);
		expect(window.document.querySelector<HTMLTextAreaElement>('#borrowed')?.value).toBe('Keep this value');
	});

	it('removes its fallback when the browser copy command throws', async () => {
		const denied = new Error('Legacy clipboard access denied');
		window.document.execCommand = vi.fn(() => { throw denied; });
		await expect(copy('Support report')).rejects.toBe(denied);
		expect(window.document.querySelectorAll('textarea')).toHaveLength(1);
	});

	it('removes its fallback when selecting the text throws', async () => {
		const failed = new Error('Selection failed');
		vi.spyOn(window.HTMLTextAreaElement.prototype, 'select').mockImplementation(() => { throw failed; });
		await expect(copy('Support report')).rejects.toBe(failed);
		expect(window.document.querySelectorAll('textarea')).toHaveLength(1);
	});
});
