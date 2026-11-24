import type { TechnologyDefinition } from '@/lib/detection/types';

export const getbuttonTechnologyDefinition: TechnologyDefinition = {
	id: 'getbutton',
	name: 'GetButton',
	website: 'https://getbutton.io',
	description:
		'The chat button by GetButton takes website visitor directly to the messaging app such as Facebook Messenger or WhatsApp and allows them to initiate a conversation with you.',
	icon: 'GetButton.svg',
	categories: [
		'widgets-misc',
		'email-messaging',
	],
	rules: [
		{
			id: 'getbutton:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\.getbutton\\.io\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
		pricing: [
			'freemium',
			'low',
			'recurring',
		],
	},
} as const satisfies TechnologyDefinition;
