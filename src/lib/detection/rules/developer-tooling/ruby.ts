import type { TechnologyDefinition } from '../../types';

export const rubyTechnologyDefinition = {
	id: "ruby",
	name: "Ruby",
	website: "https://ruby-lang.org",
	description: "Ruby is an open-source object-oriented programming language.",
	icon: "Ruby.png",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "ruby:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("(?:Mongrel|WEBrick|Ruby)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ruby:header:1",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("(?:Mongrel|Ruby(?:\\/([\\d\\.]+))?)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ruby:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("(?:mongrel|ruby(?:\\/([\\d\\.]+))?)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:ruby-lang:ruby:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
