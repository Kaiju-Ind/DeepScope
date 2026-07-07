import type { TechnologyDefinition } from '../../types';

export const ektronCmsTechnologyDefinition = {
	id: "ektron-cms",
	name: "Ektron CMS",
	website: "https://www.optimizely.com/ektron-cms",
	description: "Ektron CMS is developed on the Microsoft .NET framework and is 100% ASP.NET. In 2015 Ektron merged with EPiServer.",
	icon: "Optimizely.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "ektron-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/ektron\\.javascript\\.ashx"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ektron-cms:jsGlobal:1",
			kind: "jsGlobal",
			property: "Ektron",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ektron:ektron_content_management_system:*:*:*:*:*:*:*:*",
	},
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
