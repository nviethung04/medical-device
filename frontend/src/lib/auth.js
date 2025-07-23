import { decrypt } from "@/utils/Security";
import { getUUID } from "./getUUID";

export function getToken(req) {
  const authorization = req.headers.get("authorization");
  const token = authorization?.split(" ")[1];

  if (!token) {
    return null;
  }

  return token;
}

export const validateToken = async (req) => {
  const token = await getToken(req);
  if (!token) {
    return null;
  }
  try {
    let decryptedToken = await decrypt(token);
    decryptedToken = JSON.parse(decryptedToken);
    decryptedToken = decryptedToken.id;
    return getUUID(decryptedToken);
  } catch (error) {
    return null;
  }
};
