import type { TechnologyDefinition } from '../../types';

export const zcloudingTechnologyDefinition = {
	id: "zclouding",
	name: "ZClouding",
	website: "https://zclouding.com",
	description: "ZClouding is a cloud-based platform that enables businesses to create, manage, and maintain their online presence through web-based tools and services.",
	icon: "ZClouding.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "zclouding:scriptContent:0",
			kind: "scriptContent",
			pattern: new RegExp("track\\.zclouding\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
