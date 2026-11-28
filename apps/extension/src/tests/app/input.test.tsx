// @vitest-environment jsdom
import { createSignal } from 'solid-js';
import { render } from 'solid-js/web';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { Input } from '../../ui/input.tsx';
import { InputGroup, InputGroupInput } from '../../ui/input-group.tsx';

/** Every mounted control has one DOM owner and is disposed before its host is removed. */
const mounts: { dispose: () => void; host: HTMLDivElement }[] = [];

afterEach(() => {
	for (const { dispose, host } of mounts.splice(0)) {
		dispose();
		host.remove();
	}
});

describe('shared input in the Solid consumer', () => {
	it('forwards native events and ref while the caller controls the search value', () => {
		const host = document.createElement('div');
		document.body.append(host);
		const [query, setQuery] = createSignal('React');
		const edited = vi.fn();
		let field!: HTMLInputElement;
		const dispose = render(() => <Input
			type="search"
			value={query()}
			aria-label="Search detected technologies"
			ref={(element) => { field = element; }}
			onInput={(event) => { setQuery(event.currentTarget.value); edited(query()); }}
		/>, host);
		mounts.push({ dispose, host });
		expect(field).toBe(host.querySelector('input'));
		expect(field.value).toBe('React');
		field.value = 'Vue';
		field.dispatchEvent(new Event('input', { bubbles: true }));
		expect(query()).toBe('Vue');
		expect(edited).toHaveBeenCalledWith('Vue');
		setQuery('Solid');
		expect(field.value).toBe('Solid');
		expect(field.getAttribute('aria-label')).toBe('Search detected technologies');
	});

	it('keeps caller-owned invalid and disabled states on the native element', () => {
		const host = document.createElement('div');
		const [disabled, setDisabled] = createSignal(true);
		const dispose = render(() => <Input disabled={disabled()} aria-invalid="true" class="consumer-class" />, host);
		mounts.push({ dispose, host });
		const field = host.querySelector('input')!;
		expect(field.disabled).toBe(true);
		expect(field.getAttribute('aria-invalid')).toBe('true');
		expect(field.classList.contains('z-input')).toBe(true);
		expect(field.classList.contains('consumer-class')).toBe(true);
		setDisabled(false);
		expect(field.disabled).toBe(false);
	});

	it('lets the existing input group own the bare field surface', () => {
		const host = document.createElement('div');
		const dispose = render(() => <InputGroup><InputGroupInput aria-label="Composed search" /></InputGroup>, host);
		mounts.push({ dispose, host });
		const field = host.querySelector('input')!;
		expect(field.dataset.slot).toBe('input-group-control');
		expect(field.classList.contains('z-input')).toBe(false);
		expect(field.classList.contains('z-input-bare')).toBe(true);
		expect(field.hasAttribute('surface')).toBe(false);
		expect(field.closest('[data-slot="input-group"]')).not.toBeNull();
	});
});
