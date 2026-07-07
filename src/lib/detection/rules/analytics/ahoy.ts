import type { TechnologyDefinition } from '../../types';

export const ahoyTechnologyDefinition = {
	id: "ahoy",
	name: "Ahoy",
	website: "https://github.com/ankane/ahoy",
	description: "Ahoy is a Ruby gem that provides simple and powerful analytics for Ruby on Rails applications.",
	categories: [
		"analytics",
	],
	rules: [
		{
			id: "ahoy:jsGlobal:0",
			kind: "jsGlobal",
			property: "ahoy",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ahoy:cookie:1",
			kind: "cookie",
			keyPattern: new RegExp("^ahoy_track$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ahoy:cookie:2",
			kind: "cookie",
			keyPattern: new RegExp("^ahoy_visit$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ahoy:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^ahoy_visitor$", "i"),
			description: "Cookie name matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"ruby-on-rails",
	],
} as const satisfies TechnologyDefinition;
