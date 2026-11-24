import type { TechnologyDefinition } from '@/lib/detection/types';

export const leadtexTechnologyDefinition: TechnologyDefinition = {
	id: 'leadtex',
	name: 'Leadtex',
	website: 'https://leadteh.ru',
	description: 'Leadtex is a software solution focused on the development of chatbots.',
	icon: 'Leadteh.svg',
	categories: [
		'email-messaging',
	],
	rules: [
		{
			id: 'leadtex:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('app\\.leadteh\\.ru\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
