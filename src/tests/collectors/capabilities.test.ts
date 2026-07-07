import { describe, expect, it } from 'vitest';

import {
	EXTENSION_COLLECTOR_CAPABILITIES,
	getExtensionCollectorCapability,
	listUnsupportedExtensionCollectorKinds,
} from '@/lib/collectors/capabilities';
import type { RuntimeDetectionKind } from '@/lib/detection/types';

const RUNTIME_DETECTION_KINDS: readonly RuntimeDetectionKind[] = [
	'dom',
	'html',
	'scriptSrc',
	'stylesheetHref',
	'resourceUrl',
	'requestUrl',
	'scriptContent',
	'stylesheetContent',
	'cookie',
	'header',
	'responseHeader',
	'requestHeader',
	'jsGlobal',
	'meta',
	'link',
	'storage',
	'url',
	'text',
	'robots',
	'dns',
	'certIssuer',
	'probe',
];

describe('extension collector capability table', () => {
	it('classifies every runtime detector rule kind', () => {
		const kinds = EXTENSION_COLLECTOR_CAPABILITIES.map((capability) => capability.kind);

		expect(kinds).toEqual(RUNTIME_DETECTION_KINDS);
	});

	it('marks rule sources the extension collector does not feed today', () => {
		expect(listUnsupportedExtensionCollectorKinds()).toEqual([
			'requestHeader',
			'robots',
			'dns',
			'certIssuer',
			'probe',
		]);
	});

	it('keeps injected JavaScript globals separate from content-script DOM collection', () => {
		expect(getExtensionCollectorCapability('jsGlobal')).toMatchObject({
			support: 'collected',
			source: 'injected script',
		});
		expect(getExtensionCollectorCapability('dom')).toMatchObject({
			support: 'collected',
			source: 'content script',
		});
	});
});
