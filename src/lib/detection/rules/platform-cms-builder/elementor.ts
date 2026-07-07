import type { TechnologyDefinition } from '../../types';

export const elementorTechnologyDefinition = {
	id: "elementor",
	name: "Elementor",
	website: "https://elementor.com",
	description: "Elementor is a website builder platform for professionals on WordPress.",
	icon: "Elementor.svg",
	categories: [
		"platform-cms-builder",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "elementor:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wp-content\\/plugins\\/elementor(?:-pro)?\\/.+frontend-modules\\.min\\.js(?:\\?ver=(\\d+(?:\\.\\d+)+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "elementor:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/elementor/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "elementor:jsGlobal:2",
			kind: "jsGlobal",
			property: "elementorFrontend.getElements",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementor:jsGlobal:3",
			kind: "jsGlobal",
			property: "elementorFrontendConfig.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementor:meta:4",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^Elementor\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "elementor:jsGlobal:5",
			kind: "jsGlobal",
			property: "ElementorProFrontendConfig",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementor:jsGlobal:6",
			kind: "jsGlobal",
			property: "ElementsKit_Helper.ajaxLoading",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementor:jsGlobal:7",
			kind: "jsGlobal",
			property: "elementorModules",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementor:jsGlobal:8",
			kind: "jsGlobal",
			property: "elementorProFrontend",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "elementor:cookie:9",
			kind: "cookie",
			keyPattern: new RegExp("^elementor_pro_login$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "elementor:meta:10",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("^elementor\\s([\\d\\.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"freemium",
			"onetime",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
