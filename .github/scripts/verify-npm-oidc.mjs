const packages = ["@bryan-hoang/aoc-client", "@bryan-hoang/aoc-cli"];
const registry = new URL("https://registry.npmjs.org");

const requestToken = process.env.ACTIONS_ID_TOKEN_REQUEST_TOKEN;
const requestUrl = process.env.ACTIONS_ID_TOKEN_REQUEST_URL;

if (!requestToken || !requestUrl) {
	throw new Error("GitHub OIDC request credentials are unavailable");
}

async function getIdToken() {
	const url = new URL(requestUrl);
	url.searchParams.set("audience", "npm:registry.npmjs.org");

	const response = await fetch(url, {
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${requestToken}`,
		},
	});

	if (!response.ok) {
		throw new Error(`GitHub OIDC request failed with status ${response.status}`);
	}

	const body = await response.json();
	if (typeof body.value !== "string") {
		throw new TypeError("GitHub OIDC response did not contain a token");
	}

	return body.value;
}

function readClaims(token) {
	const payload = token.split(".")[1];
	if (!payload) {
		throw new TypeError("GitHub OIDC token did not contain a payload");
	}

	return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
}

async function readError(response) {
	try {
		const body = await response.json();
		return body?.body?.message ?? body?.message ?? body?.error ?? response.statusText;
	} catch {
		return response.statusText;
	}
}

for (const [index, packageName] of packages.entries()) {
	const idToken = await getIdToken();

	if (index === 0) {
		const { aud, job_workflow_ref, sub, workflow_ref } = readClaims(idToken);
		console.log({ aud, job_workflow_ref, sub, workflow_ref });
	}

	const escapedName = packageName.replace("/", "%2F");
	const exchangeUrl = new URL(`/-/npm/v1/oidc/token/exchange/package/${escapedName}`, registry);
	const response = await fetch(exchangeUrl, {
		method: "POST",
		headers: {
			Accept: "application/json",
			Authorization: `Bearer ${idToken}`,
			"Content-Length": "0",
		},
	});

	if (!response.ok) {
		throw new Error(
			`npm rejected the OIDC identity for ${packageName}: ${response.status} ${await readError(response)}`,
		);
	}

	const body = await response.json();
	if (typeof body.token !== "string") {
		throw new TypeError(`npm did not issue an OIDC token for ${packageName}`);
	}

	console.log(`npm accepted the OIDC identity for ${packageName}`);
}
