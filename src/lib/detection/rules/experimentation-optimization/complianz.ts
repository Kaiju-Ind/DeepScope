import type { TechnologyDefinition } from '../../types';

export const complianzTechnologyDefinition = {
	id: "complianz",
	name: "Complianz",
	website: "https://complianz.io",
	description: "Complianz is a GDPR/CCPA Cookie Consent plugin that supports GDPR, DSGVO, CCPA and PIPEDA with a conditional Cookie Notice and customized Cookie Policy based on the results of the built-in Cookie Scan.",
	icon: "Complianz.png",
	categories: [
		"experimentation-optimization",
		"privacy-compliance",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "complianz:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/complianz-gdpr-premium"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "complianz:jsGlobal:1",
			kind: "jsGlobal",
			property: "complianz.version",
			valuePattern: new RegExp("([\\d.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "complianz:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("wp-content\\/plugins\\/complianz-gdpr"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
			"recurring",
		],
		cpe: "cpe:2.3:a:really-simple-plugins:complianz:*:*:*:*:*:wordpress:*:*",
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
