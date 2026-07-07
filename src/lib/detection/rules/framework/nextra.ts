import type { TechnologyDefinition } from '../../types';

export const nextraTechnologyDefinition = {
	id: "nextra",
	name: "Nextra",
	website: "https://nextra.site/",
	description: "Nextra is Next.js based static site generator.",
	icon: "Nextra.svg",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "nextra:dom:0",
			kind: "dom",
			selector: "div.nextra-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nextra:dom:1",
			kind: "dom",
			selector: "div.nextra-nav-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nextra:dom:2",
			kind: "dom",
			selector: "div.nextra-sidebar-container",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "nextra:jsGlobal:3",
			kind: "jsGlobal",
			property: "__nextra_internal__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nextra:jsGlobal:4",
			kind: "jsGlobal",
			property: "__nextra_pageContext__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "nextra:scriptContent:5",
			kind: "scriptContent",
			pattern: new RegExp("nextra\\/\\/.site\\/"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"next-js",
	],
} as const satisfies TechnologyDefinition;
