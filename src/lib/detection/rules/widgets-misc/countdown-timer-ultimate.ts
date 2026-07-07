import type { TechnologyDefinition } from '../../types';

export const countdownTimerUltimateTechnologyDefinition = {
	id: "countdown-timer-ultimate",
	name: "Countdown Timer Ultimate",
	website: "https://wordpress.org/plugins/countdown-timer-ultimate",
	description: "Add and display responsive Countdown timer on your website.",
	categories: [
		"widgets-misc",
		"wordpress-ecosystem",
	],
	rules: [
		{
			id: "countdown-timer-ultimate:dom:0",
			kind: "dom",
			selector: "link[href*='/wp-content/plugins/countdown-timer-ultimate/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	requires: [
		"wordpress",
	],
} as const satisfies TechnologyDefinition;
