import type { TechnologyDefinition } from '../../types';

export const sitewrenchTechnologyDefinition = {
	id: "sitewrench",
	name: "SiteWrench",
	website: "https://www.sitewrench.com",
	description: "SiteWrench is a secure CMS providing live support for managing and maintaining websites.",
	icon: "SiteWrench.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "sitewrench:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.sitewrench\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "sitewrench:jsGlobal:1",
			kind: "jsGlobal",
			property: "SitewrenchBase",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
