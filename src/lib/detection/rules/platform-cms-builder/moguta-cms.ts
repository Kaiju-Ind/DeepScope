import type { TechnologyDefinition } from '../../types';

export const mogutaCmsTechnologyDefinition = {
	id: "moguta-cms",
	name: "Moguta.CMS",
	website: "https://moguta.ru",
	description: "Moguta is a Russian-based ecommerce platform that provides tools and solutions for creating and managing online stores.",
	icon: "Moguta.CMS.png",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "moguta-cms:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("mg-(?:core|plugins|templates)\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "moguta-cms:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]+href=[\"'][^\"]+mg-(?:core|plugins|templates)\\/"),
			description: "HTML contains a known technology signature.",
		},
		{
			id: "moguta-cms:dom:2",
			kind: "dom",
			selector: "link[href*='mg-core/'], link[href*='mg-plugins/'], link[href*='mg-templates/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"onetime",
			"recurring",
		],
	},
	implies: [
		"php",
	],
} as const satisfies TechnologyDefinition;
