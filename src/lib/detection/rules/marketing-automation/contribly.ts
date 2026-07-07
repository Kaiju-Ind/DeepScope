import type { TechnologyDefinition } from '../../types';

export const contriblyTechnologyDefinition = {
	id: "contribly",
	name: "Contribly",
	website: "https://www.contribly.com",
	description: "Contribly is a user-generated content (UGC) dashboard for journalists that streamlines the management of community submissions, supporting workflows from content intake through publication.",
	icon: "Contribly.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "contribly:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("\\.amazonaws\\.com\\/contribly-widgets\\/"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "contribly:jsGlobal:1",
			kind: "jsGlobal",
			property: "$contriblyjQuery",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "contribly:jsGlobal:2",
			kind: "jsGlobal",
			property: "contriblyApi",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
