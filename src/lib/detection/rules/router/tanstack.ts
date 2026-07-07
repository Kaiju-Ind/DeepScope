import type { TechnologyDefinition } from '../../types';

export const tanstackTechnologyDefinition = {
	id: "tanstack",
	name: "TanStack",
	website: "https://tanstack.com",
	description: "TanStack is a set of headless JavaScript libraries for building web application features such as data fetching, tables, routing, virtualization, and state management.",
	icon: "TanStack.svg",
	categories: [
		"router",
		"developer-tooling",
	],
	rules: [
		{
			id: "tanstack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/static\\/.*npm\\.tanstack.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "tanstack:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("(?:https?:)?\\/\\/(?:www\\.)?tanstack\\.com(?:\\/[^\"'>]*)?"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "tanstack:dom:2",
			kind: "dom",
			selector: "link[href*='@tanstack']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: false,
		oss: true,
	},
} as const satisfies TechnologyDefinition;
