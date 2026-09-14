import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center sm:px-6">
      <h1 className="font-heading text-2xl tracking-tight">Page not found</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Button className="mt-6" render={<Link href="/" />}>
        Back home
      </Button>
    </div>
  );
}
