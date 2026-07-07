import type { TechnologyDefinition } from '../../types';

export const popmixTechnologyDefinition = {
	id: "popmix",
	name: "Popmix",
	website: "https://popmixcrm.com",
	description: "Popmix CRM is a customer relationship management platform designed to manage sales, marketing, and recruitment activities through unified tools for tracking, communication, and performance analysis.",
	icon: "PopmixCRM.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "popmix:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.popmixcrm\\.com"),
			description: "Script content contains a bounded technology signature.",
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
