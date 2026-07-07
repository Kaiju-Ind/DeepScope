import type { TechnologyDefinition } from '../../types';

export const adobeExperienceManagerFranklinTechnologyDefinition = {
	id: "adobe-experience-manager-franklin",
	name: "Adobe Experience Manager Franklin",
	website: "https://www.hlx.live",
	description: "Adobe Experience Manager Franklin, also known as Project Helix or Composability, is a new way to publish AEM pages using Google Drive or Microsoft Office via Sharepoint. Instead of components, Franklin uses blocks to build pages. Blocks are pieces of a document that will be transformed into web page content.",
	icon: "Adobe Experience Manager Franklin.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adobe-experience-manager-franklin:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("^.+\\/scripts\\/lib-franklin\\.js$"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-experience-manager-franklin:jsGlobal:1",
			kind: "jsGlobal",
			property: "hlx.RUM_MANUAL_ENHANCE",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:adobe:experience_manager:*:*:*:*:*:*:*:*",
	},
	excludes: [
		"adobe-experience-manager",
	],
} as const satisfies TechnologyDefinition;
