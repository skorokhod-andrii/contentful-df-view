import { createClient } from "contentful";
import { contentfulAccessToken } from "./constants";

const client = createClient({
  space: "vncu03ia8yij",
  environment: "master",
  accessToken: contentfulAccessToken,
  host: "preview.contentful.com",
});

export const getEntitiesList = async (): Promise<string[]> => {
  const entities = await client.getEntries({
    "sys.contentType.sys.id": "mlEntity",
    limit: 1000,
  });
  const { items } = entities;
  const list = items.reduce((acc, cur) => {
    const fields = cur.fields as { name: string; roles?: string[] };
    const { name, roles } = fields;
    if (roles && roles.length) {
      return [...acc, ...roles.map((role) => `${name}@${role}`)];
    }
    return [...acc, name];
  }, [] as string[]);
  console.log(entities);
  return list;
};
