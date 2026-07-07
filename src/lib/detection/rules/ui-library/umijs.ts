import type { TechnologyDefinition } from '../../types';

export const umijsTechnologyDefinition = {
	id: "umijs",
	name: "UmiJs",
	website: "https://umijs.org",
	description: "UmiJs is a scalable, enterprise-class frontend application framework that supports both configuration and conventional routing while maintaining functional completeness, such as dynamic routing, nested routing, and permission routing.",
	icon: "UmiJs.png",
	categories: [
		"ui-library",
	],
	rules: [
		{
			id: "umijs:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/umi\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "umijs:jsGlobal:1",
			kind: "jsGlobal",
			property: "g_umi.version",
			valuePattern: new RegExp("([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "umijs:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("\\/umi(\\.[\\w\\d]{8})?\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"node-js",
	],
} as const satisfies TechnologyDefinition;
