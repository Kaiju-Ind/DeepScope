import type { TechnologyDefinition } from '@/lib/detection/types';

export const tinybirdTechnologyDefinition: TechnologyDefinition = {
	id: 'tinybird',
	name: 'Tinybird',
	website: 'https://www.tinybird.co/',
	description:
		'Tinybird is a cloud-native data processing platform that allows developers and data teams to build real-time data pipelines and perform complex data transformations and analysis at scale.',
	icon: 'Tinybird.svg',
	categories: [
		'analytics',
	],
	rules: [
		{
			id: 'tinybird:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.tinybird.co\\/js\\/index\\.js'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'tinybird:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'Tinybird',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'payg',
		],
	},
} as const satisfies TechnologyDefinition;
