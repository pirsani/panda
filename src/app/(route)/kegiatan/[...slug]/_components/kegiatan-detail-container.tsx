"use client";
import FloatingComponent from "@/components/floating-component";
import PdfPreviewContainer from "@/components/pdf-preview-container";
import { KegiatanIncludeAllDetail } from "@/data/kegiatan";
import useFileStore from "@/hooks/use-file-store";
import { useEffect } from "react";
import RiwayatPengajuan from "./riwayat-pengajuan";
import TabelPesertaKegiatan from "./tabel-peserta";

interface KegiatanDetailContainerProps {
  kegiatan: KegiatanIncludeAllDetail | null;
}
const KegiatanDetailContainer = ({
  kegiatan,
}: KegiatanDetailContainerProps) => {
  const { fileUrl, isPreviewHidden } = useFileStore();
  const handleOnHide = () => {
    useFileStore.setState({ isPreviewHidden: true });
  };

  useEffect(() => {
    handleOnHide();
  }, []);

  return (
    <div className="flex gap-2 flex-col">
      <div className="flex flex-col w-full">
        <h1 className="bg-gray-500 text-gray-50 p-2 rounded-t-sm">
          Peserta Kegiatan
        </h1>
        <TabelPesertaKegiatan data={kegiatan?.pesertaKegiatan || []} />
      </div>
      <div className="flex flex-col w-full">
        <h1 className="bg-gray-500 text-gray-50 p-2 rounded-t-sm">
          Riwayat Pengajuan
        </h1>
        <RiwayatPengajuan kegiatanId={kegiatan?.id || null} />
      </div>
      <FloatingComponent hide={isPreviewHidden} onHide={handleOnHide}>
        <PdfPreviewContainer className="border-2 h-full border-gray-500" />
      </FloatingComponent>
    </div>
  );
};

export default KegiatanDetailContainer;