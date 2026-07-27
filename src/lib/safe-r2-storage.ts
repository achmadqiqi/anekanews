import { env } from "cloudflare:workers";
import { EmDashStorageError } from "emdash";
import { createStorage as createR2Storage } from "@emdash-cms/cloudflare/storage/r2";

export function createStorage(config: Record<string, unknown>) {
  const binding = typeof config.binding === "string" ? config.binding : "MEDIA";
  const bucket = (env as any)[binding];
  
  if (!bucket) {
    console.warn(`R2 binding "${binding}" not found. Running in mock storage mode.`);
    return {
      async upload() {
        throw new EmDashStorageError(
          "Fitur penyimpanan R2 belum aktif. Silakan aktifkan R2 di dashboard Cloudflare Anda dan hubungkan bucketnya.",
          "NOT_CONFIGURED"
        );
      },
      async download() {
        throw new EmDashStorageError("Penyimpanan R2 tidak dikonfigurasi.", "NOT_CONFIGURED");
      },
      async delete() {
        throw new EmDashStorageError("Penyimpanan R2 tidak dikonfigurasi.", "NOT_CONFIGURED");
      },
      async exists() {
        return false;
      },
      async list() {
        return { files: [] };
      },
      getPublicUrl(key: string) {
        return `/_emdash/api/media/file/${key}`;
      }
    };
  }
  
  return createR2Storage(config);
}
