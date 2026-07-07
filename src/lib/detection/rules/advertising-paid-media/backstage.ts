import type { TechnologyDefinition } from '../../types';

export const backstageTechnologyDefinition = {
	id: "backstage",
	name: "Backstage",
	website: "https://yourbackstage.io",
	description: "Backstage is a provider of premium marketing templates designed for affiliates, offering ready-made emails, videos, and funnels to streamline campaign performance.",
	icon: "Backstage.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "backstage:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.yourbackstage\\.io"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
