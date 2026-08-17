import type { TechnologyDefinition } from '@/lib/detection/types';

export const responsiveNavTechnologyDefinition: TechnologyDefinition = {
	id: 'responsive-nav',
	name: 'Responsive Nav',
	website: 'http://responsive-nav.com/',
	description: 'Responsive navigation plugin without library dependencies and with fast touch screen support.',
	icon: 'Responsive Nav.png',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'responsive-nav:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp('responsive-nav(?:\\.min)?\\.js(?:\\?ver=((?:\\d+\\.)+\\d+))?'),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
