import type { TechnologyDefinition } from '../../types';

export const fygaroTechnologyDefinition = {
	id: "fygaro",
	name: "Fygaro",
	website: "https://www.fygaro.com",
	description: "Fygaro is an online commerce platform enabling businesses to sell online, manage retail operations, and streamline daily business activities.",
	icon: "Fygaro.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "fygaro:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.fygaro\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "fygaro:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("fygaro-production\\.s3"),
			description: "Script content contains a bounded technology signature.",
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
