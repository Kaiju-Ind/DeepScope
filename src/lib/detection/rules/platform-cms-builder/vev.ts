import type { TechnologyDefinition } from '../../types';

export const vevTechnologyDefinition = {
	id: "vev",
	name: "Vev",
	website: "https://www.vev.design",
	description: "Vev is a cloud-based design and publishing platform that enables users to create interactive digital content without coding, using a drag-and-drop interface and built-in templates and integrations.",
	icon: "Vev.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "vev:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\.vev\\.design\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "vev:jsGlobal:1",
			kind: "jsGlobal",
			property: "vev.App.compare",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "vev:jsGlobal:2",
			kind: "jsGlobal",
			property: "vev.DEFAULT_APP_STATE",
			description: "Page-owned global matches a known technology marker.",
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
