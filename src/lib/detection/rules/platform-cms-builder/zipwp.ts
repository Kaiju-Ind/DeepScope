import type { TechnologyDefinition } from '../../types';

export const zipwpTechnologyDefinition = {
	id: "zipwp",
	name: "ZipWP",
	website: "https://zipwp.com",
	description: "ZipWP is a website builder that enables creation of professional sites with extensive customization options and no coding required.",
	icon: "ZipWP.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zipwp:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.zipwp\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
