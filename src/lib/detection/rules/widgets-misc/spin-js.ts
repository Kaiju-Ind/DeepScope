import type { TechnologyDefinition } from '../../types';

export const spinJsTechnologyDefinition = {
	id: "spin-js",
	name: "Spin.js",
	website: "https://spin.js.org",
	description: "Spin.js is a configurable JavaScript/CSS spinner serving as a resolution-independent loading indicator.",
	icon: "SpinJS.svg",
	categories: [
		"widgets-misc",
		"graphics-visualization",
	],
	rules: [
		{
			id: "spin-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdnjs\\.cloudflare\\.com\\/ajax\\/libs\\/spin\\.js\\/([\\d\\.]+)\\/spin\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "spin-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "Spinner",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "spin-js:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("spin(?:\\.min)?\\.js(?:\\?ver=([\\d.]+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
