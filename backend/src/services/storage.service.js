import ImageKit from "@imagekit/nodejs";
import config from "../config/config.js";

const client = new ImageKit({
  publicKey: config.imageKitPublicKey,
  privateKey: config.imageKitPrivateKey,
  urlEndpoint: config.imageKitEndPoint,
});

export async function uploadFile(buffer, filename, folder = "snitch") {
  const result = await client.files.upload({
    file: await ImageKit.toFile(buffer),
    fileName: filename,
    folder: folder,
  });
  return result;
}
