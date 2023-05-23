import { NFTStorage, File } from "nft.storage";

// Paste your NFT.Storage API key into the quotes:
const NFT_STORAGE_KEY = import.meta.env.VITE_NFT_STORAGE_KEY;

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
