import type { TechnologyDefinition } from '../../types';

export const aosTechnologyDefinition = {
	id: "aos",
	name: "AOS",
	website: "https://michalsnik.github.io/aos/",
	description: "JavaScript library to animate elements on your page as you scroll.",
	icon: "AOS.svg",
	categories: [
		"animation",
		"widgets-misc",
	],
	rules: [
		{
			id: "aos:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("unpkg\\.com\\/aos@([\\d\\.]+)\\/dist\\/aos\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aos:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/typo3conf\\/ext\\/udem_vendor\\/Resources\\/Public\\/aos-([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "aos:dom:2",
			kind: "dom",
			selector: " body[data-aos-easing]",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "aos:jsGlobal:3",
			kind: "jsGlobal",
			property: "AOS.init",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aos:jsGlobal:4",
			kind: "jsGlobal",
			property: "AOS.refresh",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aos:jsGlobal:5",
			kind: "jsGlobal",
			property: "AOS.refreshHard",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "aos:header:6",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("^AdministerAOS", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "aos:scriptSrc:7",
			kind: "scriptSrc",
			pattern: new RegExp("\\/typo3conf\\/ext\\/udem_vendor\\/resources\\/public\\/aos-([\\d\\.]+)"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
