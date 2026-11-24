import type { TechnologyDefinition } from '@/lib/detection/types';

export const springbigTechnologyDefinition: TechnologyDefinition = {
	id: 'springbig',
	name: 'Springbig',
	website: 'https://springbig.com',
	description: 'Springbig is a marketing platform designed for regulated industries.',
	icon: 'Springbig.svg',
	categories: [
		'marketing-automation',
	],
	rules: [
		{
			id: 'springbig:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('\\/plugins\\/springbig-integration-plugin-main\\/'),
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		saas: true,
	},
	requires: [
		'wordpress',
	],
} as const satisfies TechnologyDefinition;
