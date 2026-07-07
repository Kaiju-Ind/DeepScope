import type { TechnologyDefinition } from '../../types';

export const rubyOnRailsTechnologyDefinition = {
	id: "ruby-on-rails",
	name: "Ruby on Rails",
	website: "https://rubyonrails.org",
	description: "Ruby on Rails is a server-side web application framework written in Ruby under the MIT License.",
	icon: "Ruby on Rails.png",
	categories: [
		"framework",
	],
	rules: [
		{
			id: "ruby-on-rails:scriptSrc:0",
			kind: "scriptSrc",
			pattern: new RegExp("\\/assets\\/application-[a-z\\d]{32}\\/\\.js"),
			confidence: 50,
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:jsGlobal:1",
			kind: "jsGlobal",
			property: "ReactOnRails",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:jsGlobal:2",
			kind: "jsGlobal",
			property: "__REACT_ON_RAILS_EVENT_HANDLERS_RAN_ONCE__",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:cookie:3",
			kind: "cookie",
			keyPattern: new RegExp("^_session_id$", "i"),
			confidence: 75,
			description: "Cookie name matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:header:4",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("mod_(?:rails|rack)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:header:5",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("mod_(?:rails|rack)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:meta:6",
			kind: "meta",
			key: "csrf-param",
			valuePattern: new RegExp("^authenticity_token$", "i"),
			confidence: 50,
			description: "Meta tag matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:jsGlobal:7",
			kind: "jsGlobal",
			property: "_rails_loaded",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:header:8",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("mod_(?:rails|rack)", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ruby-on-rails:header:9",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("mod_(?:rails|rack)", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:rubyonrails:rails:*:*:*:*:*:*:*:*",
	},
	implies: [
		"ruby",
	],
} as const satisfies TechnologyDefinition;
