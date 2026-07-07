import type { TechnologyDefinition } from '../../types';

export const microsoftSilverlightTechnologyDefinition = {
	id: "microsoft-silverlight",
	name: "Microsoft Silverlight",
	website: "http://silverlight.net",
	description: "Microsoft Silverlight is a cross-browser, cross-platform plug-in designed for delivering advanced .NET-based media experiences.",
	icon: "MicrosoftSilverlight.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "microsoft-silverlight:jsGlobal:0",
			kind: "jsGlobal",
			property: "SILVERLIGHT_SUPPORTED",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "microsoft-silverlight:jsGlobal:1",
			kind: "jsGlobal",
			property: "Silverlight.getSilverlight",
			description: "Page-owned global matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
