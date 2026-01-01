import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Coins } from "lucide-react";

// This would come from API in real app
const topWorkers = [
  { id: 1, name: "Alex Thompson", avatar: "", coins: 15420 },
  { id: 2, name: "Maria Garcia", avatar: "", coins: 12850 },
  { id: 3, name: "David Kim", avatar: "", coins: 11200 },
  { id: 4, name: "Lisa Anderson", avatar: "", coins: 9870 },
  { id: 5, name: "John Smith", avatar: "", coins: 8540 },
  { id: 6, name: "Emma Wilson", avatar: "", coins: 7920 },
];

export function BestWorkers() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight">Top Workers</h2>
          <p className="mt-2 text-muted-foreground">
            Our highest earning members this month
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topWorkers.map((worker, index) => (
            <Card key={worker.id}>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="relative">
                  <Avatar className="h-14 w-14">
                    <AvatarImage src={worker.avatar} alt={worker.name} />
                    <AvatarFallback className="text-lg">
                      {worker.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium">{worker.name}</p>
                  <Badge variant="secondary" className="mt-1 gap-1">
                    <Coins className="h-3 w-3" />
                    {worker.coins.toLocaleString()}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}