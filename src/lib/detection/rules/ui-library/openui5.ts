import type { TechnologyDefinition } from '../../types';

export const openui5TechnologyDefinition = {
	id: "openui5",
	name: "OpenUI5",
	website: "https://openui5.org",
	description: "OpenUI5 is a JavaScript UI Framework released by SAP under the Apache 2.0 license.",
	icon: "OpenUI5.png",
	categories: [
		"ui-library",
		"component-library",
	],
	rules: [
		{
			id: "openui5:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("sap-ui-core\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "openui5:jsGlobal:1",
			kind: "jsGlobal",
			property: "sap.ui.version",
			valuePattern: new RegExp("^(.+)$"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "openui5:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^sap\\-usercontext$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
