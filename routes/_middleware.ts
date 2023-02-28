import { MiddlewareHandlerContext } from '$fresh/server.ts';

export async function handler(
	req: Request,
	ctx: MiddlewareHandlerContext,
) {
	const resp = await ctx.next();
	resp.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload',
	);
	resp.headers.set(
		'content-security-policy',
		'default-src \'self\'; script-src \'self\' \'unsafe-inline\'; img-src \'self\' https://external-content.duckduckgo.com/; report-uri https://nickwasused.report-uri.com/r/d/csp/enforce;',
	);
	resp.headers.set('X-Frame-Options', 'DENY');
	resp.headers.set('X-Content-Type-Options', 'nosniff');
	resp.headers.set('Referrer-Policy', 'no-referrer-when-downgrade');
	resp.headers.set('Permissions-Policy', 'interest-cohort=()');

	return resp;
}
