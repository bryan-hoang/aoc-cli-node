import defu from 'defu';
import { type FetchOptions, type ResponseType, ofetch } from 'ofetch';
import aocClient from '../package.json' assert { type: 'json' };

const apiFetch = ofetch.create({ baseURL: 'https://adventofcode.com/' });

export function fetchAoc<T, R extends ResponseType = 'json'>(
	request: Parameters<typeof apiFetch>[0],
	options?: FetchOptions<R>,
) {
	const headers = {
		'User-Agent': `${aocClient.name}/${aocClient.version}`,
	};
	return apiFetch<T, R>(request, defu(options, { headers }));
}
