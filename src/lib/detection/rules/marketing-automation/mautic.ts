import type { TechnologyDefinition } from '../../types';

export const mauticTechnologyDefinition = {
	id: "mautic",
	name: "Mautic",
	website: "https://www.mautic.org/",
	description: "Mautic is a free and open-source marketing automation tool for Content Management, Social Media, Email Marketing, and can be used for the integration of social networks, campaign management, forms, questionnaires, reports, etc.",
	icon: "mautic.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "mautic:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("[^a-z]mtc.*\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mautic:jsGlobal:1",
			kind: "jsGlobal",
			property: "MauticTrackingObject",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mautic:jsGlobal:2",
			kind: "jsGlobal",
			property: "MauticFormValidations",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "mautic:jsGlobal:3",
			kind: "jsGlobal",
			property: "MauticSDK",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:mautic:mautic:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
