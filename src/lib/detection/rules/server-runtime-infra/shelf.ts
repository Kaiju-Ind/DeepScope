import type { TechnologyDefinition } from '../../types';

export const shelfTechnologyDefinition = {
	id: "shelf",
	name: "Shelf",
	website: "https://pub.dev/packages/shelf",
	description: "Shelf is a server framework for Dart.",
	icon: "Dart.svg",
	categories: [
		"server-runtime-infra",
	],
	rules: [
		{
			id: "shelf:header:0",
			kind: "header",
			key: "Server",
			valuePattern: new RegExp("dart:io with Shelf", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shelf:header:1",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("Dart with package:shelf", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shelf:header:2",
			kind: "header",
			key: "server",
			valuePattern: new RegExp("dart:io with shelf", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "shelf:header:3",
			kind: "header",
			key: "x-powered-by",
			valuePattern: new RegExp("dart with package:shelf", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
	},
	implies: [
		"dart",
	],
} as const satisfies TechnologyDefinition;
