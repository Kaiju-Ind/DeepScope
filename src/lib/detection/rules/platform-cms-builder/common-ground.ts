import type { TechnologyDefinition } from '../../types';

export const commonGroundTechnologyDefinition = {
	id: "common-ground",
	name: "Common Ground",
	website: "https://common-ground.io",
	description: "Common Ground is an online solution for independent record sellers.",
	icon: "CommonGround.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "common-ground:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("static\\.common-ground\\.io\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "common-ground:jsGlobal:1",
			kind: "jsGlobal",
			property: "webpackJsonpcommonground-react",
			description: "Page-owned global matches a known technology marker.",
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
