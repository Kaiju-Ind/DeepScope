import type { TechnologyDefinition } from '../../types';

export const gptAiPowerTechnologyDefinition = {
	id: "gpt-ai-power",
	name: "GPT AI Power",
	website: "https://gptaipower.com",
	description: "GPT AI Power is a WordPress plugin that offers a comprehensive AI package.",
	icon: "GPT AI Power.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "gpt-ai-power:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/gpt3-ai-content-generator\\/.+\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:gptaipower:gpt_ai_power:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
