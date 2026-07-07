import type { TechnologyDefinition } from '../../types';

export const prismTechnologyDefinition = {
	id: "prism",
	name: "Prism",
	website: "https://prismjs.com",
	description: "Prism is an extensible syntax highlighter.",
	icon: "Prism.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "prism:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("prism\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "prism:jsGlobal:1",
			kind: "jsGlobal",
			property: "Prism",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prism:jsGlobal:2",
			kind: "jsGlobal",
			property: "apex.libVersions.prismJs",
			valuePattern: new RegExp("^([\\d\\.]+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "prism:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("prism(?:\\.min)?(?:-\\w{0,64})?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
