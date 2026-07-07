import type { TechnologyDefinition } from '../../types';

export const ibmCoremetricsTechnologyDefinition = {
	id: "ibm-coremetrics",
	name: "IBM Coremetrics",
	website: "https://ibm.com/software/marketing-solutions/coremetrics",
	icon: "IBM.svg",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ibm-coremetrics:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("cmdatatagutils\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
