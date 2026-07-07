import type { TechnologyDefinition } from '../../types';

export const webstudioTechnologyDefinition = {
	id: "webstudio",
	name: "Webstudio",
	website: "https://webstudio.is",
	description: "Webstudio is a platform that enables users to build custom frontends without manually writing code.",
	icon: "Webstudio.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "webstudio:dom:0",
			kind: "dom",
			selector: "html[data-ws-last-published], div[data-ws-no-initial-animation]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "webstudio:resourceUrl:modern:0",
			kind: "resourceUrl",
			pattern: new RegExp("\\.wstd\\.io\\/"),
			confidence: 55,
			description: "Resource filename or URL matches a modern tooling marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
