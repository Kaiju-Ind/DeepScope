// Vendored from Kaiju-Ind/Utils packages/capability/requirement/mod.test.ts @ 47d2c0f.
// MIT (c) 2026 Okikio, see utils/LICENSE. Local changes: none. Resync: scripts/utils/sync.ts.
import { expect } from '@std/expect';
import { describe, it } from 'node:test';
import * as requirement from './mod.ts';

const Network = Object.freeze({ kind: 'permission', id: 'network', description: 'Network access.' });

describe('@utils/capability/requirement', () => {
	it('defines and documents provider-neutral requirement metadata', () => {
		const value = requirement.define({ family: 'permission', action: 'require', definition: Network });
		expect(requirement.define({ family: 'permission', action: 'require', definition: Network })).toBe(value);
		expect(value.id).toBe('["permission","require","permission","network"]');
		expect(requirement.document(value)).toEqual([{
			id: '["permission","require","permission","network"]',
			family: 'permission',
			action: 'require',
			definition: 'network',
			definitionKind: 'permission',
		}]);
	});

	it('projects one semantic family without interpreting it', () => {
		const permission = requirement.define({ family: 'permission', action: 'require', definition: Network });
		const meter = requirement.define({ family: 'meter', action: 'record', definition: { kind: 'meter', id: 'bytes' } });
		expect(requirement.family([permission, meter], 'permission')).toEqual([permission]);
	});
});
