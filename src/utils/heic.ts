import heic2any from "heic2any";

const HEIC_MIME_TYPES = new Set([
  "image/heic",
  "image/heif",
  "image/heic-sequence",
  "image/heif-sequence",
]);

const HEIC_EXTENSION_REGEX = /\.hei[cf]$/i;

export const isHeicFile = (file: File) => {
  if (HEIC_MIME_TYPES.has(file.type.toLowerCase())) {
    return true;
  }

  return HEIC_EXTENSION_REGEX.test(file.name);
};

const renameToJpeg = (name: string) =>
  name.replace(HEIC_EXTENSION_REGEX, ".jpg");

export const convertHeicToJpeg = async (file: File) => {
  const result = await heic2any({
    blob: file,
    toType: "image/jpeg",
    quality: 0.92,
  });

  const blobs = Array.isArray(result) ? result : [result];
  const convertedBlob = blobs[0];
  if (!(convertedBlob instanceof Blob)) {
    throw new Error("Failed to convert HEIC file");
  }

  return new File([convertedBlob], renameToJpeg(file.name), {
    type: "image/jpeg",
  });
};
