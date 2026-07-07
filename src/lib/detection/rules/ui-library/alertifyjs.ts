import type { TechnologyDefinition } from '../../types';

export const alertifyjsTechnologyDefinition = {
	id: "alertifyjs",
	name: "AlertifyJS",
	website: "https://alertifyjs.com",
	description: "AlertifyJS is a javascript framework for developing browser dialogs and notifications.",
	icon: "AlertifyJS.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "alertifyjs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/alertify\\/alertify\\.min\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "alertifyjs:jsGlobal:1",
			kind: "jsGlobal",
			property: "alertify.defaults.autoReset",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
