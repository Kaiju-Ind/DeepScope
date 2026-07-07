import type { TechnologyDefinition } from '../../types';

export const parallaxJsTechnologyDefinition = {
	id: "parallax-js",
	name: "parallax.js",
	website: "https://github.com/pixelcog/parallax.js",
	description: "Simple parallax scrolling effect.",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "parallax-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("parallax(?:\\/assets\\/js)?(?:\\/jquery)?(?:\\/scripts)?(?:\\/wow)?(?:[_\\.]move)?(?:\\.inview)?(?:\\.pkgd)?(?:\\.scrolling)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "parallax-js:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/)?parallax(?:\\/assets\\/js)?(?:\\/jquery)?(?:\\/scripts)?(?:\\/wow)?(?:[_\\.]move)?(?:\\.inview)?(?:\\.pkgd)?(?:\\.scrolling)?(?:\\.min)?\\.js"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "parallax-js:jsGlobal:2",
			kind: "jsGlobal",
			property: "parallax",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "parallax-js:jsGlobal:3",
			kind: "jsGlobal",
			property: "parallaxInstance",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
} as const satisfies TechnologyDefinition;
