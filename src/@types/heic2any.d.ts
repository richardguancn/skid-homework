declare module "heic2any" {
  type ConvertOptions = {
    blob: Blob;
    toType?: string;
    quality?: number;
  };

  type ConvertResult = Blob | Blob[];

  export default function heic2any(options: ConvertOptions): Promise<ConvertResult>;
}
