import type { TechnologyDefinition } from '@/lib/detection/types';

export const elexioTechnologyDefinition: TechnologyDefinition = {
	id: 'elexio',
	name: 'Elexio',
	website: 'https://www.elexio.com',
	description: 'Elexio is a software solution designed to manage church databases and websites.',
	icon: 'Elexio.svg',
	categories: [
		'platform-cms-builder',
	],
	rules: [
		{
			id: 'elexio:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/\\/elexiocms\\.com\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
