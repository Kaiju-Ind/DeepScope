import type { TechnologyDefinition } from "../../types.ts";
import { axiosTechnologyDefinition } from "./axios.ts";
import { fetchApiTechnologyDefinition } from "./fetch-api.ts";
import { gotTechnologyDefinition } from "./got.ts";
import { kyTechnologyDefinition } from "./ky.ts";
import { serverActionsTechnologyDefinition } from "./server-actions.ts";
import { relayGraphqlTechnologyDefinition } from "./relay-graphql.ts";
import { superagentTechnologyDefinition } from "./superagent.ts";
import { swrTechnologyDefinition } from "./swr.ts";

export const httpClientTechnologyDefinitions = [
	axiosTechnologyDefinition,
	fetchApiTechnologyDefinition,
	gotTechnologyDefinition,
	kyTechnologyDefinition,
	serverActionsTechnologyDefinition,
	relayGraphqlTechnologyDefinition,
	superagentTechnologyDefinition,
	swrTechnologyDefinition,
] as const satisfies readonly TechnologyDefinition[];
