import type { TechnologyDefinition } from '../../types';

export const auraTechnologyDefinition = {
	id: "aura",
	name: "Aura",
	website: "https://github.com/forcedotcom/aura",
	description: "Aura is an open-source UI framework built by Salesforce for developing dynamic web apps for mobile and desktop devices.",
	icon: "default.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "aura:jsGlobal:0",
			kind: "jsGlobal",
			property: "Aura.app",
			valuePattern: new RegExp("siteforce\\:communityApp"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
