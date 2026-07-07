import type { TechnologyDefinition } from '../../types';

export const sapTechnologyDefinition = {
	id: "sap",
	name: "SAP",
	website: "https://sap.com",
	icon: "SAP.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "sap:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("SAP NetWeaver Application Server", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "sap:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("sap netweaver application server", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:sap:netweaver_application_server:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
