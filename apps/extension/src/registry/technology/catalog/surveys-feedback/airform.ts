import type { TechnologyDefinition } from '@/lib/detection/types';

export const airformTechnologyDefinition: TechnologyDefinition = {
	id: 'airform',
	name: 'Airform',
	website: 'https://airform.io',
	description: 'Airform is a functional HTML forms for front-end developers.',
	icon: 'Airform.svg',
	categories: [
		'surveys-feedback',
	],
	rules: [
		{
			id: 'airform:dom:0',
			kind: 'dom',
			selector: "form[action*='airform.io/']",
			description: 'DOM selector matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
