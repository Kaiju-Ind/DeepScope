import type { TechnologyDefinition } from '../../types';
import { axiosTechnologyDefinition } from './axios';
import { fetchApiTechnologyDefinition } from './fetch-api';
import { gotTechnologyDefinition } from './got';
import { kyTechnologyDefinition } from './ky';
import { serverActionsTechnologyDefinition } from './server-actions';
import { relayGraphqlTechnologyDefinition } from './relay-graphql';
import { superagentTechnologyDefinition } from './superagent';
import { swrTechnologyDefinition } from './swr';

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
