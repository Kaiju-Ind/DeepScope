import type { TechnologyDefinition } from '../../types';

export const webassemblyTechnologyDefinition = {
	id: "webassembly",
	name: "WebAssembly",
	website: "https://webassembly.org/",
	description: "WebAssembly (abbreviated Wasm) is a binary instruction format for a stack-based virtual machine. Wasm is designed as a portable compilation target for programming languages, enabling deployment on the web for client and server applications.",
	icon: "WebAssembly.svg",
	categories: [
		"developer-tooling",
	],
	rules: [
		{
			id: "webassembly:header:0",
			kind: "header",
			key: "Content-Type",
			valuePattern: new RegExp("application\\/wasm", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "webassembly:scriptSrc:1",
			kind: "scriptSrc",
			pattern: new RegExp("\\/wasm_exec\\.js"),
			description: "Script source URL matches a known technology marker.",
		},
		{
			id: "webassembly:jsGlobal:2",
			kind: "jsGlobal",
			property: "wasmBinary",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webassembly:jsGlobal:3",
			kind: "jsGlobal",
			property: "wasmBinaryFile",
			description: "Page-owned global matches a known technology marker.",
		},
		{
			id: "webassembly:header:4",
			kind: "header",
			key: "content-type",
			valuePattern: new RegExp("application\\/wasm", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
	metadata: {
		oss: true,
		cpe: "cpe:2.3:a:w3:webassembly:*:*:*:*:*:*:*:*",
	},
} as const satisfies TechnologyDefinition;
