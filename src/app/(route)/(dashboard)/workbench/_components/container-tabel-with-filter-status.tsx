"use client";
import { KegiatanIncludeSatker } from "@/actions/kegiatan";
import { getKegiatanHasStatusPengajuan } from "@/actions/kegiatan/riwayat-kegiatan";
import { StatusCount } from "@/data/kegiatan/riwayat-pengajuan";
import { STATUS_PENGAJUAN } from "@/lib/constants";
import { useEffect, useState } from "react";
import FilterStatus from "./filter-status";
import TabelKegiatan from "./tabel-kegiatan";

interface ContainerTabelWithFilterStatusProps {
  kegiatan: KegiatanIncludeSatker[];
  status: StatusCount[] | null;
}
const ContainerTabelWithFilterStatus = ({
  kegiatan: initialKegiatan,
  status,
}: ContainerTabelWithFilterStatusProps) => {
  const [data, setData] = useState(initialKegiatan);
  const [filterStatus, setFilterStatus] = useState<STATUS_PENGAJUAN | null>(
    null
  );

  const handleOnStatusChange = async (status: STATUS_PENGAJUAN | null) => {
    setFilterStatus(status);
    setData([]);
    const kegiatan = await getKegiatanHasStatusPengajuan(status);
    setData(kegiatan);
  };

  useEffect(() => {
    setData(initialKegiatan);
  }, [initialKegiatan]);

  if (!status) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row w-full items-end justify-end px-2">
        <FilterStatus
          status={status}
          onChange={handleOnStatusChange}
          filterSelected={filterStatus}
        />
      </div>

      <TabelKegiatan data={data} />
    </div>
  );
};

export default ContainerTabelWithFilterStatus;
