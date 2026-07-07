import type { TechnologyDefinition } from '../../types';

export const gannettCmsTechnologyDefinition = {
	id: "gannett-cms",
	name: "Gannett CMS",
	website: "https://www.gannett.com",
	description: "Gannett CMS is a content management system developed by Gannett for creating, managing, and publishing digital content across multiple platforms.",
	icon: "Gannett.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "gannett-cms:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("gannett-d\\.openx\\.net"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
