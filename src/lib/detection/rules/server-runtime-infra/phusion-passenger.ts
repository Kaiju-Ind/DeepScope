import type { TechnologyDefinition } from '../../types';

export const phusionPassengerTechnologyDefinition = {
	id: "phusion-passenger",
	name: "Phusion Passenger",
	website: "https://phusionpassenger.com",
	description: "Phusion Passenger is a free web server and application server with support for Ruby, Python and Node.js.",
	icon: "Phusion Passenger.png",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "phusion-passenger:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("Phusion Passenger ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phusion-passenger:header:1",
			kind: "header",
			key: "X-Powered-By",
			valuePattern: new RegExp("Phusion Passenger(?:\\(R\\))? ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phusion-passenger:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("phusion passenger ([\\d.]+)", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
		{
			id: "phusion-passenger:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("phusion passenger(?:\\(r\\))? ?([\\d.]+)?", "i"),
			version: {
				source: "match",
				group: 1,
			},
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		cpe: "cpe:2.3:a:phusionpassenger:phusion_passenger:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
