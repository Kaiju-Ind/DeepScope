import type { TechnologyDefinition } from '../../types';

export const hurrytimerTechnologyDefinition = {
	id: "hurrytimer",
	name: "HurryTimer",
	website: "https://wordpress.org/plugins/hurrytimer",
	description: "HurryTimer is a cutting-edge WordPress plugin that enables users to create customizable, scheduled countdown timers to further engage visitors and increase conversions.",
	icon: "HurryTimer.png",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "hurrytimer:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("hurrytimer(?:\\/assets)?(?:\\/js)?(?:\\/cookie)?(?:\\/jquery)?(?:\\.countdown)?(?:\\.min)?\\.js(?:\\?v(?:er)?=((?:\\d+\\.)+\\d+))?"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "hurrytimer:dom:1",
			kind: "dom",
			selector: "link[href*='/wp-content/uploads/hurrytimer/'], #hurrytimer, #hurrytimer-css",
			description: "DOM selector matches a known technology marker.",
		},
		{
			id: "hurrytimer:jsGlobal:2",
			kind: "jsGlobal",
			property: "hurrytimer_ajax_object",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		pricing: [
			"low",
			"recurring",
		],
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
