import {
	dedupExchange,
	fetchExchange,
	Exchange,
	stringifyVariables,
} from "urql";
import { cacheExchange, Resolver } from "@urql/exchange-graphcache";
import {
	LogoutMutation,
	MeQuery,
	MeDocument,
	LoginMutation,
	RegisterMutation,
} from "../generated/graphql";
import { betterUpdateQuery } from "./betterUpdateQuery";
import config from "../config";

import { pipe, tap } from "wonka";
import router from "next/router";

const errorExchange: Exchange = ({ forward }) => (ops$) => {
	return pipe(
		forward(ops$),
		tap(({ error }) => {
			if (error) {
				if (error?.message.includes("not authenticated")) {
					router.replace("/login"); // can add query parameters
				}
			}
		})
	);
};

// to read the data from cache and return it, combine paginaiton results into one cache list
const cursorPagination = (): Resolver => {
	return (_parent, fieldArgs, cache, info) => {
		const { parentKey: entityKey, fieldName } = info; // entityKey is Query, fieldName is posts

		const allFields = cache.inspectFields(entityKey); // get all field in cache that are under this query

		const fieldInfos = allFields.filter(
			(info) => info.fieldName === fieldName // allFields is currently me and posts,  we can filter here
		);
		const size = fieldInfos.length; // returning undefined if there is no data -- cache miss
		if (size === 0) {
			return undefined;
		}

		// we return results because we found data on cacche, so we need to tell urql when to do a query
		const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
		const isInTheCache = cache.resolve(
			cache.resolve(entityKey, fieldKey) as string,
			"post"
		);

		info.partial = !isInTheCache; // cast to boolean

		// we need to check if data is in the cache and return from cache
		let hasMore = true;
		const results: string[] = [];
		fieldInfos.forEach((fi) => {
			// from entitykey: query, get fi.fieldkey: posts  'pos{"limit":10}
			const key = cache.resolve(entityKey, fi.fieldKey) as string;
			// array of post ids
			// loop through all things in cache and compile in list
			const data = cache.resolve(key, "post") as string[];
			const _hasMore = cache.resolve(key, "hasMore");

			if (!_hasMore) {
				hasMore = _hasMore as boolean;
			}
			results.push(...data);
		});

		const obj = {
			post: results,
			hasMore: hasMore,
			__typename: "PaginatedPost"
		};

		return obj
	};
};

export const createUrqlClient = (ssrExchange: any) => ({
	url: `${config.serverip}:${config.serverport}/graphql`,

	fetchOptions: {
		credentials: "include" as const,
	},

	exchanges: [
		dedupExchange,
		cacheExchange({
			keys: {
				PaginatedPost: () => null,
			},
			resolvers: {
				Query: {
					posts: cursorPagination(), // client side resolver for post.graohql
				},
			},
			updates: {
				Mutation: {
					logout: (_result, args, cache, info) => {
						betterUpdateQuery<LogoutMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							_result,
							() => ({ me: null })
						);
					},

					login: (_result, args, cache, info) => {
						betterUpdateQuery<LoginMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							_result,
							(result, query) => {
								if (result.login.errors) {
									return query;
								} else {
									return {
										me: result.login.user,
									};
								}
							}
						);
					},

					register: (_result, args, cache, info) => {
						betterUpdateQuery<RegisterMutation, MeQuery>(
							cache,
							{ query: MeDocument },
							_result,
							(result, query) => {
								if (result.register.errors) {
									return query;
								} else {
									return {
										me: result.register.user,
									};
								}
							}
						);
					},
				},
			},
		}),
		errorExchange,
		ssrExchange,
		fetchExchange,
	],
});
