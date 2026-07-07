import type { TechnologyDefinition } from '../../types';

export const mdbootstrapTechnologyDefinition = {
	id: "mdbootstrap",
	name: "MDBootstrap",
	website: "https://mdbootstrap.com",
	description: "MDBootstrap (Material Design for Bootstrap) is a complete UI package that can be integrated with other frameworks such as Angular, React, Vue, etc. It is used to design a fully responsive and mobile-friendly layout using various components, plugins, animation.",
	icon: "MDBootstrap.png",
	categories: [
		"component-library",
	],
	rules: [
		{
			id: "mdbootstrap:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:\\/mdbootstrap\\/([\\d\\.]+)\\/)?js\\/mdb\\.min\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "mdbootstrap:jsGlobal:1",
			kind: "jsGlobal",
			property: "mdb.ScrollSpy",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"bootstrap",
	],
} as const satisfies TechnologyDefinition;
