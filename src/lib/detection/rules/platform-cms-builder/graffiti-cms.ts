import type { TechnologyDefinition } from '../../types';

export const graffitiCmsTechnologyDefinition = {
	id: "graffiti-cms",
	name: "Graffiti CMS",
	website: "https://graffiticms.codeplex.com",
	icon: "Graffiti CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "graffiti-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/graffiti\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "graffiti-cms:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^graffitibot$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "graffiti-cms:meta:2",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Graffiti CMS ([^\"]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "graffiti-cms:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("graffiti cms ([^\"]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	implies: [
		"microsoft-asp-net",
	],
} as const satisfies TechnologyDefinition;
