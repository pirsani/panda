import { dbHonorarium } from "@/lib/db-honorarium";
import {
  Itinerary,
  Jadwal,
  Kegiatan,
  Organisasi,
  PejabatPerbendaharaan,
  PesertaKegiatan,
  Provinsi,
  Spd,
} from "@prisma-honorarium/client";

export interface KegiatanIncludeSatker extends Kegiatan {
  satker: Organisasi;
  unitKerja: Organisasi;
  ppk?: PejabatPerbendaharaan | null;
  bendahara?: PejabatPerbendaharaan | null;
  spd?: Spd | null;
}

export interface JadwalIncludeKegiatan extends Jadwal {
  kegiatan: KegiatanIncludeSatker;
}

export const getKegiatanById = async (
  kegiatanId: string
): Promise<KegiatanIncludeSatker | null> => {
  const kegiatan = await dbHonorarium.kegiatan.findUnique({
    where: {
      id: kegiatanId,
    },
    include: {
      satker: true,
      unitKerja: true,
      ppk: true,
      bendahara: true,
      spd: true,
    },
  });
  return kegiatan;
};

export interface KegiatanIncludeSpd extends Kegiatan {
  satker: Organisasi;
  unitKerja: Organisasi;
  ppk?: PejabatPerbendaharaan | null;
  bendahara?: PejabatPerbendaharaan | null;
  spd?: Spd | null;
  provinsi?: Provinsi | null;
  pesertaKegiatan?: PesertaKegiatan[] | null;
  itinerary?: Itinerary[] | null;
}
export const getKegiatanIncludeSpd = async (
  kegiatanId: string
): Promise<KegiatanIncludeSpd | null> => {
  const kegiatan = await dbHonorarium.kegiatan.findUnique({
    where: {
      id: kegiatanId,
    },
    include: {
      satker: true,
      unitKerja: true,
      ppk: true,
      spd: true,
      provinsi: true,
      pesertaKegiatan: true,
      itinerary: true,
    },
  });
  return kegiatan;
};