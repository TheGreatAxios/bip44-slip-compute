const encoder = require("@ensdomains/address-encoder");
const fs = require("fs");

const chains = {
	"europa": "0x79f99296",
	"calypso": "0x5d456c62",
	"nebula": "0x585eb4b1",
	"titan": "0x507aaa2a",
	"cryptoblades": "0x3d28774d",
	"human-protocol": "0x4be3e8bd",
	"europa-testnet": "0x1c6199cc",
	"calypso-testnet": "0x1482a7b2",
	"titan-testnet": "0x5a79c44e",
	"nebula-testnet": "0x1dfd2731",
	"chaos-testnet": "0x50877ed6"
};

function generateCoinType(chainId) {
  return  (0x80000000 | chainId) >>> 0;
}

async function main() {
	const entries = Object.entries(chains);

	const coinTypes = entries.map(([chain, chainId]) => {
		const chainIdDecimal = parseInt(chainId)
		const coinType = generateCoinType(chainIdDecimal);
		const coinId = coinType.toString(16);

		return {
			chain,
			chainId,
			chainIdDecimal,
			coinType,
			coinId: "0x" + coinId
		}
	});

	console.log(coinTypes);
	fs.writeFile("results.json", JSON.stringify(coinTypes), "utf-8", err => {
		if (err) {
			console.error("Failed to write to file: ", err);
		} else {
			console.log("Created Succesfully");
		}
	})
}

main()
	.catch((err) => {
		console.error(err);
		process.exitCode = 1;
	});
