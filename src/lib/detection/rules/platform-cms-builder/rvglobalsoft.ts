import type { TechnologyDefinition } from '../../types';

export const rvglobalsoftTechnologyDefinition = {
	id: "rvglobalsoft",
	name: "RVGlobalSoft",
	website: "https://www.rvglobalsoft.com",
	description: "RVGlobalSoft is a cPanel-based content management system that enables users to manage website content, files, and configurations through a hosting control panel interface.",
	icon: "RVGlobalSoft.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "rvglobalsoft:meta:0",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^RVGlobalsoft$", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"onetime",
		],
	},
} as const satisfies TechnologyDefinition;
