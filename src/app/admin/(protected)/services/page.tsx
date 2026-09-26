import { getServices } from "@/data/services";
import { ServicesForm } from "./services-form";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <div>
      <h1 className="font-heading text-2xl tracking-tight">Services</h1>
      <p className="mt-1 text-sm text-muted-foreground">Shown on the /coaching page.</p>
      <div className="mt-6">
        <ServicesForm initial={services} />
      </div>
    </div>
  );
}
