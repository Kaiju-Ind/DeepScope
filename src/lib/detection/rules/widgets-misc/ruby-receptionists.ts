import type { TechnologyDefinition } from '../../types';

export const rubyReceptionistsTechnologyDefinition = {
	id: "ruby-receptionists",
	name: "Ruby Receptionists",
	website: "https://www.ruby.com",
	description: "Ruby Receptionists is a Portland, Oregon based virtual answering service for small businesses.",
	icon: "Ruby Receptionists.svg",
	categories: [
		"widgets-misc",
	],
	rules: [
		{
			id: "ruby-receptionists:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("chatwidget\\.ruby\\.com"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ruby-receptionists:jsGlobal:1",
			kind: "jsGlobal",
			property: "rubyApi",
			description: "Page-owned global matches a known technology marker.",
		},
	],
	metadata: {
		saas: true,
		pricing: [
			"mid",
			"recurring",
		],
	},
} as const satisfies TechnologyDefinition;
