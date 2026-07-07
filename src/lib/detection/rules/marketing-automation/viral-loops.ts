import type { TechnologyDefinition } from '../../types';

export const viralLoopsTechnologyDefinition = {
	id: "viral-loops",
	name: "Viral Loops",
	website: "https://viral-loops.com",
	description: "Viral Loops is a viral and referral marketing platform to launch ranking competitions, sweepstakes, pre-launch and referral programs.",
	icon: "Viral Loops.svg",
	categories: [
		"marketing-automation",
	],
	rules: [
		{
			id: "viral-loops:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("app\\.viral-loops\\.com\\/"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "viral-loops:dom:1",
			kind: "dom",
			selector: "link[href*='wp-content/plugins/viral-loops-wp-integration/assets/']",
			description: "DOM selector matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"low",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
