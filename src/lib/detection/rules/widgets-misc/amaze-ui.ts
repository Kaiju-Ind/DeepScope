import type { TechnologyDefinition } from '../../types';

export const amazeUiTechnologyDefinition = {
	id: "amaze-ui",
	name: "Amaze UI",
	website: "https://amazeui.shopxo.net/",
	description: "Amaze UI is a mobile-first JavaScript library designed to simplify front-end development.",
	icon: "Amaze UI.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "amaze-ui:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("(?:((?:\\d+\\.)+\\d+)\\/(?:js\\/)?)?amazeui(?:\\/js\\/jquery)?(?:\\.widgets)?(?:\\.helper)?(?:\\.legacy)?(?:\\.min)?\\.js"),
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
