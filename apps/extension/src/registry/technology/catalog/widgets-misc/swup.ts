import type { TechnologyDefinition } from '@/lib/detection/types';

export const swupTechnologyDefinition: TechnologyDefinition = {
	id: 'swup',
	name: 'Swup',
	website: 'https://swup.js.org',
	description:
		'Swup is a versatile and expandable library for implementing page transitions on websites that use server-side rendering.',
	icon: 'Swup.svg',
	categories: [
		'widgets-misc',
	],
	rules: [
		{
			id: 'swup:scriptSrc:0',
			kind: 'scriptSrc',
			pattern: new RegExp(
				'(?:((?:\\d{1,9}\\.){1,12}\\d+)\\/(?:dist\\/)?)?swup(?:-preload)?(?:-plugin)?(?:\\.min)?\\.js',
			),
			version: {
				source: 'match',
				group: 1,
			},
			description: 'Script source URL matches a known technology marker.',
		},
		{
			id: 'swup:dom:1',
			kind: 'dom',
			selector: "html[class*='swup-enabled']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'swup:jsGlobal:2',
			kind: 'jsGlobal',
			property: 'Swup',
			description: 'Page-owned global matches a known technology marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
