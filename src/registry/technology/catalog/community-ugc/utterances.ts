import type { TechnologyDefinition } from '@/lib/detection/types';

export const utterancesTechnologyDefinition: TechnologyDefinition = {
	id: 'utterances',
	name: 'utterances',
	website: 'https://utteranc.es/',
	description: 'Utterances is a lightweight comments widget built on GitHub issues.',
	icon: 'utterances.svg',
	categories: [
		'community-ugc',
	],
	rules: [
		{
			id: 'utterances:requestUrl:0',
			kind: 'requestUrl',
			pattern: new RegExp('\\.utteranc\\.es'),
			description: 'Observed request URL matches a known technology marker.',
		},
		{
			id: 'utterances:dom:1',
			kind: 'dom',
			selector: "iframe[src*='utteranc.es']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
