import type { TechnologyDefinition } from '../../types';

export const tippyJsTechnologyDefinition = {
	id: "tippy-js",
	name: "Tippy.js",
	website: "https://atomiks.github.io/tippyjs",
	description: "Tippy.js is the complete tooltip, popover, dropdown, and menu solution for the web, powered by Popper.",
	icon: "Tippy.js.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "tippy-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/tippy\\.js(?:@|\\/)?([\\d\\.]+)?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tippy-js:dom:1",
			kind: "dom",
			selector: "style[data-tippy-stylesheet]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tippy-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "tippy.defaultProps",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
