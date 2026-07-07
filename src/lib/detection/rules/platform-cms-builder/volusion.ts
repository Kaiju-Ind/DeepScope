import type { TechnologyDefinition } from '../../types';

export const volusionTechnologyDefinition = {
	id: "volusion",
	name: "Volusion",
	website: "https://www.volusion.com",
	description: "Volusion is a cloud-based, hosted ecommerce solution.",
	icon: "Volusion.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "volusion:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/volusion\\.js(?:\\?([\\d.]*))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "volusion:html:1",
			kind: "html",
			pattern: new RegExp("<link [^>]*href=\"[^\"]*\\/vspfiles\\/"),
			version: {
				source: "match",
				template: "1",
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "volusion:html:2",
			kind: "html",
			pattern: new RegExp("<body [^>]*data-vn-page-name"),
			version: {
				source: "match",
				template: "2",
			},
			description: "HTML contains a known technology signature.",
		},
		{
			id: "volusion:jsGlobal:3",
			kind: "jsGlobal",
			property: "volusion",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "volusion:dom:4",
			kind: "dom",
			selector: "body[data-vn-page-name], link[href*='/vspfiles/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "volusion:jsGlobal:5",
			kind: "jsGlobal",
			property: "VOLUSION.affixYourOrder",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "volusion:jsGlobal:6",
			kind: "jsGlobal",
			property: "VOLUSION_HELPERS",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "volusion:jsGlobal:7",
			kind: "jsGlobal",
			property: "VolusionChat",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
