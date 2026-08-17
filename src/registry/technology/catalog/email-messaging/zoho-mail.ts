import type { TechnologyDefinition } from '@/lib/detection/types';

export const zohoMailTechnologyDefinition: TechnologyDefinition = {
	id: 'zoho-mail',
	name: 'Zoho Mail',
	website: 'https://www.zoho.com/mail/',
	description: 'Zoho Mail is an email hosting service for businesses.',
	icon: 'Zoho.svg',
	categories: [
		'email-messaging',
	],
	rules: [
		{
			id: 'zoho-mail:dns:0',
			kind: 'dns',
			valuePattern: new RegExp('transmail\\.net', 'i'),
			recordType: 'TXT',
			description: 'DNS record matches a known technology marker.',
		},
	],
	implies: [
		'zoho',
	],
} as const satisfies TechnologyDefinition;
