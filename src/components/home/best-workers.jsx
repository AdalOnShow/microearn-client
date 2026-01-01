import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Coins, Trophy } from "lucide-react";
import { getDb } from "@/lib/mongodb";

async function getTopWorkers() {
  try {
    const db = await getDb();
    const workers = await db
      .collection("users")
      .find({ role: "Worker" })
      .sort({ coins: -1 })
      .limit(6)
      .toArray();

    return workers.map((worker) => ({
      id: worker._id.toString(),
      name: worker.name,
      avatar: worker.image || "",
      coins: worker.coins || 0,
    }));
  } catch (error) {
    console.error("Error fetching top workers:", error);
    return [];
  }
}

// Fallback data when no workers exist
const fallbackWorkers = [
  { id: "1", name: "Alex Thompson", avatar: "", coins: 15420 },
  { id: "2", name: "Maria Garcia", avatar: "", coins: 12850 },
  { id: "3", name: "David Kim", avatar: "", coins: 11200 },
  { id: "4", name: "Lisa Anderson", avatar: "", coins: 9870 },
  { id: "5", name: "John Smith", avatar: "", coins: 8540 },
  { id: "6", name: "Emma Wilson", avatar: "", coins: 7920 },
];

const rankColors = [
  "bg-amber-500",
  "bg-slate-400",
  "bg-amber-700",
];

export async function BestWorkers() {
  const workers = await getTopWorkers();
  const topWorkers = workers.length > 0 ? workers : fallbackWorkers;
  
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
            <Trophy className="h-6 w-6 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Top Workers
          </h2>
          <p className="mt-3 text-base text-muted-foreground">
            Our highest earning members this month
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {topWorkers.map((worker, index) => (
            <Card key={worker.id} className="overflow-hidden">
              <CardContent className="flex items-center gap-4 p-5">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-border">
                    <AvatarImage src={worker.avatar} alt={worker.name} />
                    <AvatarFallback className="bg-muted text-base font-medium">
                      {worker.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {index < 3 && (
                    <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${rankColors[index]}`}>
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="truncate font-medium text-foreground">{worker.name}</p>
                  <Badge variant="secondary" className="mt-1.5 gap-1">
                    <Coins className="h-3 w-3" />
                    {worker.coins.toLocaleString()} coins
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
