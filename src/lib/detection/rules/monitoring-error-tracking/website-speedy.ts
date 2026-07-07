import type { TechnologyDefinition } from '../../types';

export const websiteSpeedyTechnologyDefinition = {
	id: "website-speedy",
	name: "Website Speedy",
	website: "https://websitespeedy.com/",
	description: "Website Speedy is a tool that improves website speed by identifying and optimizing render-blocking elements, enabling asynchronous resource loading for better performance.",
	icon: "WebsiteSpeedy.svg",
	categories: [
		"monitoring-error-tracking",
	],
	rules: [
		{
			id: "website-speedy:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("websitespeedy\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
