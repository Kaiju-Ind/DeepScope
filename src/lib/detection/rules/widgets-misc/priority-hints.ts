import type { TechnologyDefinition } from '../../types';

export const priorityHintsTechnologyDefinition = {
	id: "priority-hints",
	name: "Priority Hints",
	website: "https://wicg.github.io/priority-hints/",
	description: "Priority Hints exposes a mechanism for developers to signal a relative priority for browsers to consider when fetching resources.",
	icon: "Priority Hints.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "priority-hints:dom:0",
			kind: "dom",
			selector: "iframe[fetchpriority], img[fetchpriority], script[fetchpriority], link[fetchpriority]",
			confidence: 25,
			description: "DOM uses the fetchpriority attribute as a resource scheduling hint.",
		},
		{
			id: "priority-hints:html:1",
			kind: "html",
			pattern: new RegExp("\\sfetchpriority=", "i"),
			confidence: 25,
			description: "Document markup contains the fetchpriority attribute used by Priority Hints.",
		},
	],
} as const satisfies TechnologyDefinition;
