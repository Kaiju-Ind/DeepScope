import type { TechnologyDefinition } from '../../types';

export const visenzeTechnologyDefinition = {
	id: "visenze",
	name: "Visenze",
	website: "https://www.visenze.com",
	description: "Visenze is an AI commerce platform specializing in search and discovery solutions to help businesses improve product visibility and customer engagement.",
	icon: "Visenze.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "visenze:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cdn\\.visenze\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "visenze:jsGlobal:1",
			kind: "jsGlobal",
			property: "ViSenzeAnalytics",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "visenze:jsGlobal:2",
			kind: "jsGlobal",
			property: "visenzeLayer",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
	},
} as const satisfies TechnologyDefinition;
