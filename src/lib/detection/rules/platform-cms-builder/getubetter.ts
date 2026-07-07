import type { TechnologyDefinition } from '../../types';

export const getubetterTechnologyDefinition = {
	id: "getubetter",
	name: "getUBetter",
	website: "https://www.getubetter.com",
	description: "getUBetter is a healthcare platform that provides online access to mental health support services.",
	icon: "getUBetter.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "getubetter:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.getubetter\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
