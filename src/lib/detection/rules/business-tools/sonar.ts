import type { TechnologyDefinition } from '../../types';

export const sonarTechnologyDefinition = {
	id: "sonar",
	name: "Sonar",
	website: "https://sendsonar.com",
	description: "Sonar is a fully integrated system offering loan origination and point-of-sale solutions, combined with customer relationship management capabilities.",
	icon: "Sonar.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sonar:jsGlobal:0",
			kind: "jsGlobal",
			property: "SonarChatWidget.display",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "sonar:jsGlobal:1",
			kind: "jsGlobal",
			property: "mySonar.ajaxProtocol",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
