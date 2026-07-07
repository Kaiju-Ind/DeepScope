import type { TechnologyDefinition } from '../../types';

export const progressbarJsTechnologyDefinition = {
	id: "progressbar-js",
	name: "ProgressBar.js",
	website: "https://kimmobrunfeldt.github.io/progressbar.js/",
	description: "Responsive progress bars with animated SVG paths.",
	icon: "ProgressBar.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "progressbar-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("progressbar(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "progressbar-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?progressbar(?:\\.min)?\\.js"),
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
