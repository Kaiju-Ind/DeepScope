import type { TechnologyDefinition } from '../../types';

export const cueTechnologyDefinition = {
	id: "cue",
	name: "CUE",
	website: "https://www.stibodx.com/",
	description: "CUE is a unified media enterprise platform tailored for news media organizations seeking efficiency and revenue growth in the media market.",
	icon: "CUE.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "cue:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.cue\\.cloud"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		pricing: [
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
