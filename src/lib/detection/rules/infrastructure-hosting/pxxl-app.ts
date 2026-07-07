import type { TechnologyDefinition } from '../../types';

export const pxxlAppTechnologyDefinition = {
	id: "pxxl-app",
	name: "Pxxl App",
	website: "https://pxxl.app",
	description: "Pxxl App is a no-code platform that allows users to build and host web projects using custom subdomains on pxxl-managed domains.",
	icon: "Pxxl App.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "pxxl-app:url:0",
			kind: "url",
			pattern: new RegExp("\\.pxxl\\.app"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pxxl-app:url:1",
			kind: "url",
			pattern: new RegExp("\\.pxxl\\.tech"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pxxl-app:url:2",
			kind: "url",
			pattern: new RegExp("\\.pxxl\\.online"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pxxl-app:url:3",
			kind: "url",
			pattern: new RegExp("\\.pxxl\\.click"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pxxl-app:url:4",
			kind: "url",
			pattern: new RegExp("\\.pxxl\\.pro"),
			description: "Page URL matches a known technology marker.",
		},
		{
			id: "pxxl-app:url:5",
			kind: "url",
			pattern: new RegExp("\\.pxxl\\.site"),
			description: "Page URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
