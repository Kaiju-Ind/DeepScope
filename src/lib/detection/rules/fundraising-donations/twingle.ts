import type { TechnologyDefinition } from '../../types';

export const twingleTechnologyDefinition = {
	id: "twingle",
	name: "Twingle",
	website: "https://www.twingle.de",
	description: "Twingle is a fundraising platform that enables users to create campaigns and collect donations for various causes.",
	icon: "Twingle.svg",
	categories: [
		"fundraising-donations",
	],
	rules: [
		{
			id: "twingle:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("spenden\\.twingle\\.de"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"payg",
		],
	},
} as const satisfies TechnologyDefinition;
