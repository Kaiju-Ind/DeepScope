import type { TechnologyDefinition } from '@/lib/detection/types';

export const webicaTechnologyDefinition: TechnologyDefinition = {
	id: 'webica',
	name: 'Webica',
	website: 'https://webica.pro',
	description: 'Webica is a web-based platform designed to manage online advertising campaigns for your website.',
	icon: 'Webica.svg',
	categories: [
		'advertising-paid-media',
	],
	rules: [
		{
			id: 'webica:jsGlobal:0',
			kind: 'jsGlobal',
			property: 'WebicaWidget',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'poa',
		],
	},
} as const satisfies TechnologyDefinition;
