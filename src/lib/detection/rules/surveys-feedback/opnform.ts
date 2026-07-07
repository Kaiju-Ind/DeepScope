import type { TechnologyDefinition } from '../../types';

export const opnformTechnologyDefinition = {
	id: "opnform",
	name: "OpnForm",
	website: "https://opnform.com",
	description: "OpnForm is a web-based tool for creating and sharing forms without requiring coding knowledge, enabling users to design and distribute forms.",
	icon: "OpnForm.svg",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "opnform:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.opnform\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "opnform:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^OpnForm_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "opnform:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^opnform_session$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:jhumanj:opnform:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
