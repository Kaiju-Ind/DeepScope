import type { TechnologyDefinition } from '../../types';

export const ntlmTechnologyDefinition = {
	id: "ntlm",
	name: "NTLM",
	website: "https://docs.microsoft.com/en-us/openspecs/windows_protocols/ms-ntht/",
	description: "NTLM is an authentication method commonly used by Windows servers.",
	categories: [
		"security",
	],
	rules: [
		{
			id: "ntlm:header:0",
			kind: "header",
			key: "WWW-Authenticate",
			valuePattern: new RegExp("^NTLM", "i"),
			description: "Response header matches a known technology marker.",
		},
		{
			id: "ntlm:header:1",
			kind: "header",
			key: "www-authenticate",
			valuePattern: new RegExp("^ntlm", "i"),
			description: "Response header matches a known technology marker.",
		},
	],
} as const satisfies TechnologyDefinition;
