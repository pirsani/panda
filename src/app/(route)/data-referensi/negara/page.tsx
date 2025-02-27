import { getNegara } from "@/actions/negara";
import { checkSessionPermission } from "@/actions/pengguna/session";
import { DialogTambahNegara } from "./_components/dialog-tambah-negara";
import { TabelNegara } from "./_components/tabel-negara";

const NegaraPage = async () => {
  const createAny = await checkSessionPermission({
    actions: ["create:any"],
    resource: "referensi",
  });
  const data = await getNegara();
  return (
    <div className="p-4 pb-24 h-auto min-h-full flex flex-col gap-2">
      <h1 className="m-2">Tabel Referensi &gt; Negara </h1>
      <DialogTambahNegara />
      <TabelNegara data={data} />
    </div>
  );
};

export default NegaraPage;
