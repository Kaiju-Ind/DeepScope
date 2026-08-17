import type { TechnologyDefinition } from '@/lib/detection/types';

export const snaphostTechnologyDefinition: TechnologyDefinition = {
	id: 'snaphost',
	name: 'SnapHost',
	website: 'https://snaphost.com',
	description: 'SnapHost is a solution offering anti-spam CAPTCHA web form protection.',
	categories: [
		'security',
	],
	rules: [
		{
			id: 'snaphost:dom:0',
			kind: 'dom',
			selector: "form[action*='.SnapHost.com/']",
			description: 'DOM selector matches a known technology marker.',
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
