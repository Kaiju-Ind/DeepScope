import type { TechnologyDefinition } from '../../types';

export const onehubTechnologyDefinition = {
	id: "onehub",
	name: "Onehub",
	website: "https://www.onehub.com",
	description: "Onehub is a cloud-based platform that enables secure file sharing and access control for businesses and teams.",
	icon: "Onehub.svg",
	categories: [
		"content-publishing",
	],
	rules: [
		{
			id: "onehub:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.onehub\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "onehub:jsGlobal:1",
			kind: "jsGlobal",
			property: "Onehub",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "onehub:jsGlobal:2",
			kind: "jsGlobal",
			property: "OnehubBarView",
			description: "Page-owned global matches a known technology marker.",
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
