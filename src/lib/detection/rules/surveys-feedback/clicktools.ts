import type { TechnologyDefinition } from '../../types';

export const clicktoolsTechnologyDefinition = {
	id: "clicktools",
	name: "Clicktools",
	website: "https://clicktools.com",
	description: "Clicktools is a feedback system developed by CallidusCloud for collecting and analyzing customer input across various channels.",
	categories: [
		"surveys-feedback",
	],
	rules: [
		{
			id: "clicktools:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.clicktools\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
