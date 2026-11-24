import type { TechnologyDefinition } from '@/lib/detection/types';

export const eliseaiTechnologyDefinition: TechnologyDefinition = {
	id: 'eliseai',
	name: 'EliseAI',
	website: 'https://www.eliseai.com',
	description: 'EliseAI is an AI-powered conversational platform for business automation.',
	icon: 'EliseAI.svg',
	categories: [
		'email-messaging',
		'business-tools',
	],
	rules: [
		{
			id: 'eliseai:dom:0',
			kind: 'dom',
			selector: 'div#meetelise-chat-launcher-container',
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'eliseai:jsGlobal:1',
			kind: 'jsGlobal',
			property: 'eliseAi',
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
