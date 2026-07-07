import type { TechnologyDefinition } from '../../types';

export const adobeExperiencePlatformLaunchTechnologyDefinition = {
	id: "adobe-experience-platform-launch",
	name: "Adobe Experience Platform Launch",
	website: "https://docs.adobelaunch.com/getting-started",
	description: "Adobe Experience Cloud Launch is an extendable tag management solution for Adobe Experience Cloud, Adobe Experience Platform, and other applications.",
	icon: "Adobe Experience Platform.svg",
	categories: [
		"tag-management",
	],
	rules: [
		{
			id: "adobe-experience-platform-launch:jsGlobal:0",
			kind: "jsGlobal",
			property: "_satellite.buildInfo",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
