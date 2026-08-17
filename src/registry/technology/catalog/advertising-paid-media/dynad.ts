import type { TechnologyDefinition } from '@/lib/detection/types';

export const dynadTechnologyDefinition: TechnologyDefinition = {
	id: 'dynad',
	name: 'DynAd',
	website: 'https://dynad.net',
	description: 'DynAd is a service for advertising and dynamic content optimisation.',
	icon: 'DynAd.svg',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'dynad:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('t\\.dynad\\.net\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'dynad:dom:1',
			kind: 'dom',
			selector: "link[href*='t.dynad.net/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
