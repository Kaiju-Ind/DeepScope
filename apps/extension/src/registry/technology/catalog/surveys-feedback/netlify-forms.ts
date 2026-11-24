import type { TechnologyDefinition } from '@/lib/detection/types';

export const netlifyFormsTechnologyDefinition: TechnologyDefinition = {
	id: 'netlify-forms',
	name: 'Netlify Forms',
	website: 'https://www.netlify.com/products/forms',
	description: 'Netlify Forms is a serverless form handling solution for static websites.',
	icon: 'Netlify.svg',
	categories: [
		'surveys-feedback',
	],
	rules: [
		{
			id: 'netlify-forms:dom:0',
			kind: 'dom',
			selector: 'form[data-netlify]',
			description: 'DOM selector matches a known technology marker.',
		},
	],
	implies: [
		'netlify',
	],
} as const satisfies TechnologyDefinition;
