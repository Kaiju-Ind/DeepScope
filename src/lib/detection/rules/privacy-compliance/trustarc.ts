import type { TechnologyDefinition } from '../../types';

export const trustarcTechnologyDefinition = {
	id: "trustarc",
	name: "TrustArc",
	website: "https://trustarc.com",
	description: "TrustArc provides software and services to help corporations update their privacy management processes so they comply with government laws and best practices.",
	icon: "TrustArc.svg",
	categories: [
		"privacy-compliance",
	],
	rules: [
		{
			id: "trustarc:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("consent\\.trustarc\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
