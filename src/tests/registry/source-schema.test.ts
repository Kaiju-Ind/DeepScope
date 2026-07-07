import { describe, expect, it } from 'vitest';

import { REGISTRY_SOURCE_SCHEMA_VERSION, validateRegistrySource } from '@/lib/registry';

describe('registry source schema', () => {
	it('accepts the current TypeScript technology shape', () => {
		const result = validateRegistrySource({
			schemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
			technologies: [
				{
					id: 'example-framework',
					name: 'Example Framework',
					website: 'https://example.test',
					categories: ['framework'],
					rules: [
						{ kind: 'scriptSrc', pattern: /example-framework\.js/, confidence: 85 },
						{ kind: 'meta', key: 'generator', valuePattern: /Example Framework/ },
					],
					implies: ['example-runtime'],
				},
			],
		});

		expect(result.valid).toBe(true);
		expect(result.diagnostics).toEqual([]);
	});

	it('returns diagnostics for malformed source fields', () => {
		const result = validateRegistrySource({
			schemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
			technologies: [
				{
					id: '',
					name: 'Broken',
					website: 'https://broken.test',
					categories: ['framework'],
					rules: [{ kind: 'dom' }],
				},
			],
		});

		expect(result.valid).toBe(false);
		expect(result.diagnostics).toEqual([
			expect.objectContaining({
				severity: 'error',
				code: 'schema.invalid',
			}),
			expect.objectContaining({
				severity: 'error',
				code: 'schema.invalid',
			}),
		]);
	});

	it('rejects unknown categories before compilation', () => {
		const result = validateRegistrySource({
			schemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
			technologies: [
				{
					id: 'unknown-category-tech',
					name: 'Unknown Category Tech',
					website: 'https://unknown-category.test',
					categories: ['not-real'],
					rules: [],
				},
			],
		});

		expect(result.valid).toBe(false);
		expect(result.diagnostics).toContainEqual(
			expect.objectContaining({
				code: 'schema.invalid',
				location: expect.objectContaining({
					path: ['technologies', '0', 'categories', '0'],
				}),
			}),
		);
	});

	it('keeps RegExp objects available for the current TypeScript registry source', () => {
		const pattern = /example ([\d.]+)/;
		const result = validateRegistrySource({
			schemaVersion: REGISTRY_SOURCE_SCHEMA_VERSION,
			technologies: [
				{
					id: 'regexp-tech',
					name: 'RegExp Tech',
					website: 'https://regexp.test',
					categories: ['framework'],
					rules: [{ kind: 'scriptSrc', pattern }],
				},
			],
		});

		expect(result.value?.technologies[0]?.rules[0]).toMatchObject({ pattern });
	});
});
