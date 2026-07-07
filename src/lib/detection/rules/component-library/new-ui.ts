import type { TechnologyDefinition } from '../../types';

export const newUiTechnologyDefinition = {
	id: "new-ui",
	name: "New UI",
	website: "https://new-ui.com/",
	description: "New UI is a framework designed for developing user interfaces for SaaS applications and websites.",
	icon: "NewUI.svg",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "new-ui:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("data-new-ui-theme"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
