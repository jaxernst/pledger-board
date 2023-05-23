import { NFTStorage, File } from "nft.storage";
import mime from "mime";

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhERjk4MzkxMWIxQjhmYWQ1YjFmZjM3QTg5ZUY1M0FlM2M2MWZlRjQiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NDgxNDY2MzYxMiwibmFtZSI6InBsZWRnZXIifQ.5_2ngo6mxey4W0VkFHGM6EPE4B6-dTnKzN9Dt4dmDWY";

/**
 * Reads an image file from `imagePath` and stores an NFT with the given name and description.
 * @param {string} imagePath the path to an image file
 * @param {string} name a name for the NFT
 * @param {string} description a text description for the NFT
 */
export async function storeImage(file: File) {
  const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
  return await nftstorage.storeBlob(file);
}
