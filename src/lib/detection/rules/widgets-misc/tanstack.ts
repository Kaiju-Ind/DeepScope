import type { TechnologyDefinition } from '../../types';

export const tanstackTechnologyDefinition = {
	id: "tanstack",
	name: "TanStack",
	website: "https://tanstack.com",
	description: "TanStack is a set of headless JavaScript libraries for building web application features such as data fetching, tables, routing, virtualization, and state management.",
	icon: "TanStack.svg",
	categories: [
		"widgets-misc",
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
		{
			id: "tanstack:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("\\$_TSR\\.router="),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "tanstack:dom:4",
			kind: "dom",
			selector: "link[rel='modulepreload'][href*='tanstack-query-']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "tanstack:dom:5",
			kind: "dom",
			selector: "link[rel='modulepreload'][href*='tanstack-router-']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
