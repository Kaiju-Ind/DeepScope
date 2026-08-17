import type { TechnologyDefinition } from '@/lib/detection/types';

export const cookieAssistantTechnologyDefinition: TechnologyDefinition = {
	id: 'cookie-assistant',
	name: 'Cookie Assistant',
	website: 'https://www.cookieassistant.com',
	description: 'Cookie Assistant is a system designed to manage user consent for cookies while providing analytics.',
	icon: 'CookieAssistant.svg',
	categories: [
		'analytics',
		'privacy-compliance',
	],
	rules: [
		{
			id: 'cookie-assistant:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('app\\.cookieassistant\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'onetime',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
