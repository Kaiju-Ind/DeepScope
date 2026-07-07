import type { TechnologyDefinition } from '../../types';

export const wpLiveVisitorCounterTechnologyDefinition = {
	id: "wp-live-visitor-counter",
	name: "WP Live Visitor Counter",
	website: "https://wordpress.org/plugins/wp-visitors-widget/",
	description: "WP Live Visitor Counter is a WordPress plugin that displays the number of online visitors on a website in real-time.",
	icon: "default.svg",
	categories: [
		"wordpress-ecosystem",
		"widgets-misc",
	],
	rules: [
		{
			id: "wp-live-visitor-counter:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/wp-visitors-widget/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
