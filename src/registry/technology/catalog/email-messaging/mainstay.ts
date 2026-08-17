import type { TechnologyDefinition } from '@/lib/detection/types';

export const mainstayTechnologyDefinition: TechnologyDefinition = {
	id: 'mainstay',
	name: 'Mainstay',
	website: 'https://mainstay.com',
	description: 'Mainstay is a student engagement platform that is powered by human-centered, AI-enhanced chatbots.',
	icon: 'Mainstay.svg',
	categories: [
		'email-messaging',
		'business-tools',
	],
	rules: [
		{
			id: 'mainstay:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('webbot\\.mainstay\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
