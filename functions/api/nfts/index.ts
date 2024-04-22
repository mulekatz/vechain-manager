import { z } from "zod";

const transferSchema = z.object({
  address: z.string(),
  limit: z.number().min(1).max(100),
});

type ApiRequest = {
  limit: string;
  sortingDirection?: "asc" | "desc";
};

type Env = {
  VORJ_API_KEY?: string;
};

type BlockchainResult = {
  totalItems: number;
  totalPages: number;
  page: Array<{
    _id: string;
    contractAddress: string;
    tokenId: string;
    metadataUri: string;
    updatedAt: string;
  }>;
};

export async function onRequest({
  request,
  env,
}: {
  request: Request;
  env: Env;
}): Promise<Response> {
  try {
    if (!env.VORJ_API_KEY) {
      throw new Error("VORJ_API_KEY is not set");
    }

    const query = new URL(request.url);
    const { address, limit } = transferSchema.parse({
      address: query.searchParams.get("address"),
      limit: Number(query.searchParams.get("limit") ?? 100),
    });

    const apiRequest: ApiRequest = {
      limit: limit.toString(),
      sortingDirection: "desc",
    };

    const apiQueryParams = new URLSearchParams(apiRequest);
    const result = (await fetch(
      `https://api.vorj.app/main/v2/blockchain/nft/${address}?${apiQueryParams.toString()}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-api-key": env.VORJ_API_KEY,
        },
      }
    ).then((response) => response.json())) as BlockchainResult;

    if ("message" in result) {
      throw new Error(result.message as string);
    }

    return new Response(JSON.stringify({ ...result }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ errorMessage: err.shortMessage || err.message }),
      {
        status: 200,
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      }
    );
  }
}
