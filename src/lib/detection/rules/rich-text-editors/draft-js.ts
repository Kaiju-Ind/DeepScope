import type { TechnologyDefinition } from '../../types';

export const draftJsTechnologyDefinition = {
	id: "draft-js",
	name: "Draft.js",
	website: "https://draftjs.org/",
	description: "Draft.js is a JavaScript rich text editor framework, built for React.",
	icon: "draftjs.png",
	categories: [
		"rich-text-editors",
	],
	rules: [
		{
			id: "draft-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("draft-js(@|\\/)([\\d.]+)"),
			version: {
				source: "match",
				group: 2,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
