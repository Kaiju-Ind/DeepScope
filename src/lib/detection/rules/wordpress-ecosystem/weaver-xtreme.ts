import type { TechnologyDefinition } from '../../types';

export const weaverXtremeTechnologyDefinition = {
	id: "weaver-xtreme",
	name: "Weaver Xtreme",
	website: "https://weavertheme.com",
	description: "Weaver Xtreme is the orginal options-based WordPress theme.",
	icon: "Weaver Xtreme.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "weaver-xtreme:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/themes\\/weaver-xtreme\\/.+weaverxjslib-end\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "weaver-xtreme:dom:1",
			kind: "dom",
			selector: "link#weaverx-style-sheet-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "weaver-xtreme:jsGlobal:2",
			kind: "jsGlobal",
			property: "weaverxBottomFooter",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "weaver-xtreme:jsGlobal:3",
			kind: "jsGlobal",
			property: "weaverxMonitorContent",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "weaver-xtreme:jsGlobal:4",
			kind: "jsGlobal",
			property: "weaverxOnResize",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"onetime",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
