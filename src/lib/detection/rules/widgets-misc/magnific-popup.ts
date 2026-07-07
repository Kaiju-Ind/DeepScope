import type { TechnologyDefinition } from '../../types';

export const magnificPopupTechnologyDefinition = {
	id: "magnific-popup",
	name: "Magnific Popup",
	website: "https://dimsemenov.com/plugins/magnific-popup/",
	description: "Magnific Popup is a responsive lightbox & dialog script with focus on performance and providing best experience for user with any device.",
	icon: "Magnific Popup.png",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "magnific-popup:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("magnific-popup(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
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
