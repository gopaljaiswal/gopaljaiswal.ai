import { getVaultContent } from "@/data/vault";
import { VaultForm } from "./vault-form";

export default async function AdminVaultPage() {
  const vault = await getVaultContent();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">Vault</h1>
      <p className="mt-1 text-sm text-muted-foreground">System design vault questions and pricing.</p>
      <div className="mt-6">
        <VaultForm initial={vault} />
      </div>
    </div>
  );
}
