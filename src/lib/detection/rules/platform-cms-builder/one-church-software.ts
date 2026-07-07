import type { TechnologyDefinition } from '../../types';

export const oneChurchSoftwareTechnologyDefinition = {
	id: "one-church-software",
	name: "One Church Software",
	website: "https://onechurchsoftware.com",
	description: "One Church Software is a church management platform.",
	icon: "OneChurchSoftware.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "one-church-software:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.onechurchsoftware\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "one-church-software:dom:1",
			kind: "dom",
			selector: "onechurch[url*='app\\.onechurchsoftware\\.com/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
