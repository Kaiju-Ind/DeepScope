import type { TechnologyDefinition } from '../../types';

export const communityBoxTechnologyDefinition = {
	id: "community-box",
	name: "Community Box",
	website: "https://www.communitybox.co",
	description: "Community Box is a tool that allows users to create directories within a website without writing any code.",
	icon: "CommunityBox.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "community-box:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("cfapi\\.communitybox\\.co"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
