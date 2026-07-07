import type { TechnologyDefinition } from '../../types';

export const pickadateJsTechnologyDefinition = {
	id: "pickadate-js",
	name: "pickadate.js",
	website: "https://amsul.ca/pickadate.js/",
	description: "Mobile-friendly, responsive, and lightweight jQuery date & time input picker.",
	icon: "pickadate.js.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "pickadate-js:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("pickadate(?:\\/translations)?(?:\\/de_DE)?(?:\\/picker)?(?:\\.date)?(?:\\.time)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "pickadate-js:jsGlobal:1",
			kind: "jsGlobal",
			property: "pickadate",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "pickadate-js:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("pickadate(?:\\/translations)?(?:\\/de_de)?(?:\\/picker)?(?:\\.date)?(?:\\.time)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
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
