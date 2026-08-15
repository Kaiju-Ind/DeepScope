import type { TechnologyDefinition } from '../../types';

export const sassTechnologyDefinition: TechnologyDefinition = {
	id: 'sass',
	name: 'Sass',
	website: 'https://sass-lang.com',
	description:
		'Sass is an extension of CSS that enables you to use things like variables, nested rules, inline imports and more.',
	icon: 'Sass.svg',
	categories: [
		'styling-processor',
		'developer-tooling',
	],
	rules: [
		{
			id: 'sass:dom:0',
			kind: 'dom',
			selector: "link[href*='/index.scss']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'sass:stylesheetContent:modern:1',
			kind: 'stylesheetContent',
			pattern: new RegExp('\\._[\\da-f]{6,}(?:[\\w-]+)?__[\\da-f]{6,}'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
		{
			id: 'sass:stylesheetContent:modern:3',
			kind: 'stylesheetContent',
			pattern: new RegExp('\\$--[\\da-f]{6,}-interpolation'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
		{
			id: 'sass:stylesheetContent:modern:7',
			kind: 'stylesheetContent',
			pattern: new RegExp('--sass-color-[\\da-f]{6,}'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
		{
			id: 'sass:stylesheetContent:modern:8',
			kind: 'stylesheetContent',
			pattern: new RegExp('color:rgba\\(var\\(--sass-rgba-[\\da-f]{6,}\\)\\)'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
	],
} as const satisfies TechnologyDefinition;
