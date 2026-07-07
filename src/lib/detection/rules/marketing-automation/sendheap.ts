import type { TechnologyDefinition } from '../../types';

export const sendheapTechnologyDefinition = {
	id: "sendheap",
	name: "SendHeap",
	website: "https://sendheap.com",
	description: "SendHeap is a platform that notifies customers about order updates and informs them of campaigns and price changes across multiple communication channels.",
	icon: "SendHeap.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "sendheap:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("api\\.sendheap\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
