import type { TechnologyDefinition } from '../../types';

export const automaticMembersTechnologyDefinition = {
	id: "automatic-members",
	name: "Automatic Members",
	website: "https://automaticmembers.com",
	description: "Automic Members is an all-in-one marketing platform for fitness businesses.",
	icon: "AutomaticMembers.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "automatic-members:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("app.automaticmembers.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
