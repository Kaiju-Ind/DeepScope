import type { TechnologyDefinition } from '../../types';

export const recootyJobWidgetTechnologyDefinition = {
	id: "recooty-job-widget",
	name: "Recooty Job Widget",
	website: "https://recooty.com/job-widget-tool",
	description: "Recooty Job Widget is a web integration tool that allows businesses to embed live job listings directly onto their websites.",
	icon: "Recooty.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "recooty-job-widget:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("jobwidget\\.recooty\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "recooty-job-widget:jsGlobal:1",
			kind: "jsGlobal",
			property: "RecootyWidget.init",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"poa",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
