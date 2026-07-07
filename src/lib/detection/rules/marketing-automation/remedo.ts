import type { TechnologyDefinition } from '../../types';

export const remedoTechnologyDefinition = {
	id: "remedo",
	name: "Remedo",
	website: "https://www.remedo.io",
	description: "Remedo is a digital healthcare marketing platform that helps doctors improve their Google search visibility through advanced strategies and technology.",
	icon: "Remedo.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "remedo:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.remedo\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "remedo:header:1",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("\\.remedo\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "remedo:header:2",
			kind: "header",
			key: "content-security-policy",
			valuePattern: new RegExp("\\.remedo\\.io", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
