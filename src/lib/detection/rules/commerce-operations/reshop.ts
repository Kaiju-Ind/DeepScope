import type { TechnologyDefinition } from '../../types';

export const reshopTechnologyDefinition: TechnologyDefinition = {
	id: 'reshop',
	name: 'Reshop',
	website: 'https://www.reshop.com',
	description:
		'Reshop is a returns platform that integrates with Shopify to streamline and manage product return processes.',
	icon: 'Reshop.svg',
	categories: [
		'commerce-operations',
	],
	rules: [
		{
			id: 'reshop:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('^https?:\\/\\/[^/"\'\\s]+\\/(?:[^?#]{1,240}\\/)?widgets\\/reshop-tooltip(?:\\.min)?\\.js(?:\\?[^"\'\\s#]{0,200})?(?:#[^"\'\\s]{0,120})?$'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		'shopify',
	],
} as const satisfies TechnologyDefinition;
