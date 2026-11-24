import type { TechnologyDefinition } from '@/lib/detection/types';

export const sitehoodTechnologyDefinition: TechnologyDefinition = {
	id: 'sitehood',
	name: 'Sitehood',
	website: 'https://www.sitehood.co.il',
	description: 'Sitehood is a live chat tool for websites that enables instant support for site visitors.',
	icon: 'Sitehood.svg',
	categories: [
		'email-messaging',
	],
	rules: [
		{
			id: 'sitehood:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('vtrack\\.sitehood\\.co\\.il'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
