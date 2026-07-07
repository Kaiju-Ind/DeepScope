import type { TechnologyDefinition } from '../../types';

export const sparkloopTechnologyDefinition = {
	id: "sparkloop",
	name: "SparkLoop",
	website: "https://sparkloop.app",
	description: "SparkLoop is a newsletter growth platform that offers referral and partner tools to help newsletter operators expand their audience.",
	icon: "SparkLoop.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sparkloop:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("js\\.sparkloop\\.app\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "sparkloop:jsGlobal:1",
			kind: "jsGlobal",
			property: "SLConfig.script_url",
			valuePattern: new RegExp("\\.sparkloop\\.app"),
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
