import type { TechnologyDefinition } from '../../types';

export const businessWebsiteBuilderTechnologyDefinition = {
	id: "business-website-builder",
	name: "Business Website Builder",
	website: "https://businesswebsites.google.com/welcome",
	icon: "Google.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "business-website-builder:url:0",
			kind: "url",
			pattern: new RegExp("https?:\\/\\/[^.]+\\.business\\.page"),
			description: "Page URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
