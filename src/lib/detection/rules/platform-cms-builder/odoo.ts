import type { TechnologyDefinition } from '../../types';

export const odooTechnologyDefinition = {
	id: "odoo",
	name: "Odoo",
	website: "https://odoo.com",
	description: "Odoo is business management software which includes CRM, ecommerce, billing, accounting, manufacturing, warehouse, project management, and inventory management.",
	icon: "Odoo.svg",
	categories: [
		"platform-cms-builder",
	],
	rules: [
		{
			id: "odoo:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/web\\/js\\/(?:web\\.assets_common\\/|website\\.assets_frontend\\/)"),
			confidence: 25,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "odoo:html:1",
			kind: "html",
			pattern: new RegExp("<link[^>]* href=[^>]+\\/web\\/css\\/(?:web\\.assets_common\\/|website\\.assets_frontend\\/)"),
			confidence: 25,
			description: "HTML contains a known technology signature.",
		},
		{
			id: "odoo:jsGlobal:2",
			kind: "jsGlobal",
			property: "odoo.session_info",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "odoo:meta:3",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("Odoo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "odoo:dom:4",
			kind: "dom",
			selector: "link[href*='/web/css/web.assets_common/'], link[href*='/web/css/website.assets_frontend/']",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "odoo:jsGlobal:5",
			kind: "jsGlobal",
			property: "odoo.csrf_token",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "odoo:meta:6",
			kind: "meta",
			key: "generator",
			valuePattern: new RegExp("odoo", "i"),
			description: "Meta tag matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:odoo:odoo:*:*:*:*:*:*:*:*",
	},
	implies: [
		"less",
		"postgresql",
		"python",
	],
} as const satisfies TechnologyDefinition;
