import type { TechnologyDefinition } from '@/lib/detection/types';

export const aspNetMvcTechnologyDefinition: TechnologyDefinition = {
	id: 'asp-net-mvc',
	name: 'ASP.NET MVC',
	website: 'https://dotnet.microsoft.com/apps/aspnet/mvc',
	description:
		'ASP.NET MVC is a web application framework from Microsoft implementing the model-view-controller pattern.',
	categories: [
		'server-runtime-infra',
	],
	rules: [
		{
			id: 'asp-net-mvc:header:0',
			kind: 'header',
			key: 'x-aspnetmvc-version',
			valuePattern: /(?<version>\d+(?:\.\d+)*)/,
			version: {
				source: 'match',
				group: 'version',
			},
			description: 'X-AspNetMvc-Version response header.',
		},
	],
	metadata: {
		cpe: 'cpe:2.3:a:microsoft:asp.net_mvc:*:*:*:*:*:*:*:*',
	},
};
