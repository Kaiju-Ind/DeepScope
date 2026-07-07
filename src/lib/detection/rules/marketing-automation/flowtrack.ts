import type { TechnologyDefinition } from '../../types';

export const flowtrackTechnologyDefinition = {
	id: "flowtrack",
	name: "FlowTrack",
	website: "https://www.flowtrack.co",
	description: "FlowTrack is an app that consolidates multiple services into one platform, enabling websites to attract more visitors and convert them into leads.",
	icon: "FlowTrack.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "flowtrack:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.flowtrack\\.co\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"onetime",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
