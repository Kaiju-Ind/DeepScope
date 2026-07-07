import type { TechnologyDefinition } from '../../types';

export const propertyShellTechnologyDefinition = {
	id: "property-shell",
	name: "Property Shell",
	website: "https://propertyshell.com",
	description: "Property Shell is a real estate CRM solution to manage, develop, and drive the selling of residential and commercial property, and more.",
	icon: "PropertyShell.svg",
	categories: [
		"business-tools",
	],
	rules: [
		{
			id: "property-shell:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("api\\.propertyshell\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "property-shell:scriptContent:1",
			kind: "scriptContent",
			pattern: new RegExp("api\\.propertyshell\\.com"),
			description: "Script content contains a bounded technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"payg",
			"poa",
		],
	},
} as const satisfies TechnologyDefinition;
