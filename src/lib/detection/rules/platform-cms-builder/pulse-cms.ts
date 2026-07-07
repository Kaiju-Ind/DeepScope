import type { TechnologyDefinition } from '../../types';

export const pulseCmsTechnologyDefinition = {
	id: "pulse-cms",
	name: "Pulse CMS",
	website: "https://pulsecms.com",
	description: "Pulse CMS is a content management system built with PHP that uses flat files instead of a database, offering a platform for managing web content without requiring extensive server resources or technical expertise.",
	icon: "Pulse.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "pulse-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/PulseCMS\\/.*?\\/tracker\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pulse-cms:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/pulsecms\\/.*?\\/tracker\\.php"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"low",
			"recurring",
		],
		cpe: "cpe:2.3:a:pulsecms:pulse_cms:*:*:*:*:*:*:*:*",
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
