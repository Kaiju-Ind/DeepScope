import type { TechnologyDefinition } from '../../types';

export const zopeTechnologyDefinition = {
	id: "zope",
	name: "Zope",
	website: "https://zope.org",
	description: "Zope is an open-source web application server and content management framework that helps developers build and manage complex web applications with features like object-oriented programming and scalable architecture.",
	icon: "Zope.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "zope:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("^Zope\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "zope:header:1",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("^zope\\/", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:zope:zope:*:*:*:*:*:*:*:*",
	},
	implies: [
		"python",
	],
} as const satisfies TechnologyDefinition;
