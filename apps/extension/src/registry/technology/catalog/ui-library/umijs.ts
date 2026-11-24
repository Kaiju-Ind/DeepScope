import type { TechnologyDefinition } from '@/lib/detection/types';

export const umijsTechnologyDefinition: TechnologyDefinition = {
	id: 'umijs',
	name: 'UmiJS',
	website: 'https://umijs.org/',
	description:
		'Umi is an extensible React application framework with configuration-based and convention-based routing plus a lifecycle-wide plugin system.',
	icon: 'UmiJs.png',
	categories: [
		'ui-library',
	],
	rules: [
		{
			id: 'umijs:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/umi\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'umijs:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'g_umi.version',
			valuePattern: new RegExp('([\\d\\.]+)'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Page-owned global matches a known technology marker.',
		},
		{
			id: 'umijs:scriptSrc:2',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/umi(\\.[\\w\\d]{8})?\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		'node-js',
	],
} as const satisfies TechnologyDefinition;
