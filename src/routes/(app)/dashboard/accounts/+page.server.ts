import type { Account } from '$lib/models/types/accounts';
import { getAppError, isAppError } from '$lib/utils/errors';
import { createData } from '$mocks/data/accounts';
import { error, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ url }) => {
	const firstName = url.searchParams.get('firstName') ?? encodeURIComponent('*');
	const lastName = url.searchParams.get('lastName') ?? encodeURIComponent('*');
	const limit = url.searchParams.get('limit') ?? '50';

	try {
		const accounts: Account[] = createData(100);
		if (!accounts?.length) throw { code: 404, message: 'not found' };
		return { accounts };
	} catch (err) {
		// err as App.Error
		if (isAppError(err)) {
			throw error(400, err);
		}
		throw error(500, getAppError(err));
	}
}) satisfies PageServerLoad;
