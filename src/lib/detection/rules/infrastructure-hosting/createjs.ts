import type { TechnologyDefinition } from '../../types';

export const createjsTechnologyDefinition = {
	id: "createjs",
	name: "CreateJS",
	website: "https://code.createjs.com",
	description: "CreateJS is a suite of modular libraries and tools which work together or independently to enable interactive content on open web technologies via HTML5.",
	icon: "CreateJS.svg",
	categories: [
		"infrastructure-hosting",
	],
	rules: [
		{
			id: "createjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("code\\.createjs\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
