import { z } from "zod";
import { pangkatGolonganOptionalNullableSchema } from "./golongan-ruang";
import { tanggalSchema, tanggalSchemaOptional } from "./tanggal";

const cuid2Schema = z
  .string()
  .min(21, {
    message: "Pilih satker",
  })
  .regex(/^[a-z0-9]+$/);

export const pejabatPerbendaharaanSchema = z.object({
  id: z.string().optional(),
  NIK: z
    .string()
    .min(16, {
      message: "NIK harus 16 digit",
    })
    .max(16)
    .optional(), // id adalah NIK 16 digit jika paspor untuk nonwni maka 16 digit dimulai dari 9 dan 7 digit pertama adalah nomor paspor dan 9 digit terakhir adalah tanggal lahir di format yyyymmdd contoh dipisah dengan strip
  nama: z.string().min(3).max(255),
  NIP: z.union([
    z
      .string()
      .length(1, {
        message: "NIP harus 18 digit atau hanya karakter '-' jika tidak ada",
      })
      .regex(/^-$/), // Single character "-"
    z
      .string()
      .length(18)
      .regex(/^\d{18}$/), // 18-character number
  ]),
  jabatanId: z.string().min(2, { message: "Pilih jabatan" }),
  pangkatGolonganId: pangkatGolonganOptionalNullableSchema,
  satkerId: cuid2Schema,
  tmtMulai: tanggalSchema,
  tmtSelesai: tanggalSchemaOptional,
});

export type PejabatPerbendaharaan = z.infer<typeof pejabatPerbendaharaanSchema>;
