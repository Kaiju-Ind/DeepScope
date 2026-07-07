import type { TechnologyDefinition } from '../../types';

export const wysibbTechnologyDefinition = {
	id: "wysibb",
	name: "WysiBB",
	website: "https://wysibb.com",
	description: "WysiBB very simple and functional open-source WYSIWYG BBCode editor based on jQuery.",
	icon: "WysiBB.svg",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "wysibb:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jquery\\.wysibb\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"jquery",
	],
} as const satisfies TechnologyDefinition;
