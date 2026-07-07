import type { TechnologyDefinition } from '../../types';

export const googlePublisherTagTechnologyDefinition = {
	id: "google-publisher-tag",
	name: "Google Publisher Tag",
	website: "https://developers.google.com/publisher-tag/guides/get-started",
	description: "Google Publisher Tag (GPT) is an ad tagging library for Google Ad Manager which is used to dynamically build ad requests.",
	icon: "Google Developers.svg",
	categories: [
		"advertising-paid-media",
	],
	rules: [
		{
			id: "google-publisher-tag:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("googletagservices\\.com\\/tag\\/js\\/gpt\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-publisher-tag:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("securepubads\\.g\\.doubleclick\\.net\\/gpt"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-publisher-tag:scriptSrc:2",
			kind: "scriptSrc",
			pattern: new RegExp("securepubads\\.g\\.doubleclick.net\\/tag\\/js\\/gpt\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "google-publisher-tag:scriptSrc:3",
			kind: "scriptSrc",
			pattern: new RegExp("pagead2\\.googlesyndication\\.com\\/tag\\/js\\/gpt\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
