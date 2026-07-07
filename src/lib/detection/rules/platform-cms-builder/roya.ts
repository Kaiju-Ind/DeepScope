import type { TechnologyDefinition } from '../../types';

export const royaTechnologyDefinition = {
	id: "roya",
	name: "Roya",
	website: "https://www.roya.com",
	description: "Roya is a digital platform designed to enhance online presence through streamlined tools and structured content management.",
	icon: "Roya.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "roya:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("static\\.royacdn\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
