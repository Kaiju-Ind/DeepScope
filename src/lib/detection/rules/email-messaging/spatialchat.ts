import type { TechnologyDefinition } from '../../types';

export const spatialchatTechnologyDefinition = {
	id: "spatialchat",
	name: "SpatialChat",
	website: "https://spatial.chat",
	description: "SpatialChat is a platform for interactive video meetings, designed to host events such as all-hands meetings, keynotes, and online classes.",
	icon: "SpatialChat.svg",
	categories: [
		"email-messaging",
	],
	rules: [
		{
			id: "spatialchat:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app\\.spatial\\.chat"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
