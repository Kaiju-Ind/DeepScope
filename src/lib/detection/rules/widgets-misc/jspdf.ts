import type { TechnologyDefinition } from '../../types';

export const jspdfTechnologyDefinition = {
	id: "jspdf",
	name: "jsPDF",
	website: "https://parall.ax/products/jspdf",
	description: "jsPDF is an HTML5 client-side solution for generating PDF documents directly within web browsers.",
	icon: "jsPDF.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "jspdf:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/jspdf\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "jspdf:jsGlobal:1",
			kind: "jsGlobal",
			property: "jsPDF.API",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"freemium",
		],
	},
} as const satisfies TechnologyDefinition;
