import type { TechnologyDefinition } from '@/lib/detection/types';

export const ecCubeTechnologyDefinition: TechnologyDefinition = {
	id: 'ec-cube',
	name: 'EC-CUBE',
	website: 'https://www.ec-cube.net',
	description: 'EC-CUBE is an open source package used to build ecommerce sites.',
	icon: 'EC-CUBE.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'ec-cube:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('eccube\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
		cpe: 'cpe:2.3:a:lockon:ec-cube:*:*:*:*:*:*:*:*',
	},
	implies: [
		'php',
	],
} as const satisfies TechnologyDefinition;
