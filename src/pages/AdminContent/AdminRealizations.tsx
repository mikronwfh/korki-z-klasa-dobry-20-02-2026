import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function AdminRealizations() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Realizacje</h2>
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground mb-4">
            Sekcja Realizacji — wkrótce pełna edycja.
          </p>
          <Button disabled>Wkrótce dostępne</Button>
        </CardContent>
      </Card>
    </div>
  );
}
