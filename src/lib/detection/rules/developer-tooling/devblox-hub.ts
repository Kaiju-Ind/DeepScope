import type { TechnologyDefinition } from '../../types';

export const devbloxHubTechnologyDefinition = {
	id: "devblox-hub",
	name: "DevBlox Hub",
	website: "https://www.devbloxhub.com",
	description: "DevBlox is a Roblox asset marketplace for developers offering scripts and models, with an emphasis on curated, secure assets for game development.",
	icon: "DevBloxHub.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "devblox-hub:header:0",
			kind: "header",
			key: "Content-Security-Policy",
			valuePattern: new RegExp("devbloxhub\\.com", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
