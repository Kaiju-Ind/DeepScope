import type { TechnologyDefinition } from '../../types';

export const cmsCaddyTechnologyDefinition = {
	id: "cms-caddy",
	name: "CMS Caddy",
	website: "https://cmscaddy.com",
	description: "CMS Caddy is a headless content management system that provides a flexible structure for publishing and managing content across projects and devices in a single platform.",
	icon: "CMSCaddy.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cms-caddy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.cmscaddy\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
