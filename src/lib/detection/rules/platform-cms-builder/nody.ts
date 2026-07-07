import type { TechnologyDefinition } from '../../types';

export const nodyTechnologyDefinition = {
	id: "nody",
	name: "Nody",
	website: "https://www.nody.cz",
	description: "Nody is a platform that enables the creation of online shops without requiring programming knowledge.",
	icon: "Nody.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "nody:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cdn\\.mujnody\\.cz"),
			description: "Script content contains a bounded technology signature.",
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
