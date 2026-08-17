import type { TechnologyDefinition } from '@/lib/detection/types';

export const lessTechnologyDefinition: TechnologyDefinition = {
	id: 'less',
	name: 'Less',
	website: 'https://lesscss.org',
	description:
		'Less is a CSS preprocessor, providing a set of extensions and features to traditional Cascading Style Sheets (CSS) for improved maintainability and ease of styling in web development.',
	icon: 'Less.png',
	categories: [
		'styling-processor',
		'widgets-misc',
	],
	rules: [
		{
			id: 'less:html:0',
			kind: 'html',
			pattern: new RegExp('<link[^>]+ rel="stylesheet\\/less"'),
			description: 'HTML contains a known technology signature.',
		},
		{
			id: 'less:dom:1',
			kind: 'dom',
			selector: "link[rel='stylesheet/less']",
			description: 'DOM selector matches a known technology marker.',
		},
		{
			id: 'less:stylesheetContent:modern:4',
			kind: 'stylesheetContent',
			pattern: new RegExp('less-[\\da-f]{8}-extend'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
		{
			id: 'less:stylesheetContent:modern:6',
			kind: 'stylesheetContent',
			pattern: new RegExp('\\+\\s*_[\\da-f]{8}(?!\\w)'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
		{
			id: 'less:stylesheetContent:modern:7',
			kind: 'stylesheetContent',
			pattern: new RegExp('@plugin\\s+"less-plugin-[\\w-]+";'),
			confidence: 45,
			description: 'Stylesheet content matches a modern styling marker.',
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
