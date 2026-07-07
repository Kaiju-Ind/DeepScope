import type { TechnologyDefinition } from '../../types';

export const adobeExperienceManagerTechnologyDefinition = {
	id: "adobe-experience-manager",
	name: "Adobe Experience Manager",
	website: "https://www.adobe.com/marketing/experience-manager.html",
	description: "Adobe Experience Manager (AEM) is a content management solution for building websites, mobile apps and forms.",
	icon: "Adobe Experience Platform.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "adobe-experience-manager:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/etc\\/designs\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-experience-manager:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/etc\\/clientlibs\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-experience-manager:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/etc\\.clientlibs\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "adobe-experience-manager:scriptContent:3",
			kind: "scriptContent",
			pattern: new RegExp("aem-(?:GridColumn|apps\\/)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "adobe-experience-manager:html:4",
			kind: "html",
			pattern: new RegExp("<div class=\"[^\"]*parbase"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adobe-experience-manager:html:5",
			kind: "html",
			pattern: new RegExp("<div[^>]+data-component-path=\"[^\"+]jcr:"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adobe-experience-manager:html:6",
			kind: "html",
			pattern: new RegExp("<div class=\"[^\"]*aem-Grid"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "adobe-experience-manager:scriptContent:7",
			kind: "scriptContent",
			pattern: new RegExp("aem-(?:GridColumn|apps\\/)|AEMMode"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "adobe-experience-manager:dom:8",
			kind: "dom",
			selector: "div[class*='parbase'], div[data-component-path*='jcr:'], div[class*='aem-Grid']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "adobe-experience-manager:scriptContent:9",
			kind: "scriptContent",
			pattern: new RegExp("aem-(?:gridcolumn|apps\\/)"),
			description: "Script content contains a bounded technology signature.",
		},
		{
			id: "adobe-experience-manager:html:10",
			kind: "html",
			pattern: new RegExp("<div class=\"[^\"]*aem-grid"),
			description: "HTML contains a known technology signature.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"poa",
		],
		cpe: "cpe:2.3:a:adobe:experience_manager:*:*:*:*:*:*:*:*",
	},
	implies: [
		"java",
	],
} as const satisfies TechnologyDefinition;
