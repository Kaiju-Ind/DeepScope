import type { TechnologyDefinition } from '../../types';

export const brilliantWebToLeadTechnologyDefinition = {
	id: "brilliant-web-to-lead",
	name: "Brilliant Web-to-Lead",
	website: "https://brilliantplugins.com/downloads/salesforce/",
	description: "Brilliant Web-to-Lead plugin facilitates the technical integration between WordPress installations and Salesforce CRM accounts, enabling the exchange and synchronization of data.",
	icon: "Brilliant Web-to-Lead.png",
	categories: [
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "brilliant-web-to-lead:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/salesforce-wordpress-to-lead\\/"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	implies: [
		"salesforce",
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
