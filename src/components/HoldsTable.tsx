import { motion } from "framer-motion";
import { Clock, TrendingUp } from "lucide-react";

interface Hold {
  id: string;
  amount: string;
  currency: string;
  endDate: string;
  profit: string;
  status: "active" | "ending";
}

const HoldsTable = () => {
  const holds: Hold[] = [
    {
      id: "1",
      amount: "50,000",
      currency: "₽",
      endDate: "2 часа 45 минут",
      profit: "+12.5%",
      status: "active"
    },
    {
      id: "2", 
      amount: "25,000",
      currency: "₽",
      endDate: "13 минут",
      profit: "+8.2%",
      status: "active"
    },
    {
      id: "3",
      amount: "75,000", 
      currency: "₽",
      endDate: "1 день 5 часов",
      profit: "+15.7%",
      status: "ending"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-card shadow-card rounded-2xl p-6 mb-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Активные холды</h2>
      </div>

      <div className="space-y-3">
        {holds.map((hold, index) => (
          <motion.div
            key={hold.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className={`bg-muted rounded-xl p-4 border-l-4 ${
              hold.status === "ending" ? "border-l-accent" : "border-l-primary"
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex items-baseline gap-1">
                <span className="text-xl font-bold text-foreground">
                  {hold.amount}
                </span>
                <span className="text-sm text-muted-foreground">
                  {hold.currency}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {hold.endDate}
                  </span>
                  {hold.status === "ending" && (
                    <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                      Завершается
                    </span>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HoldsTable;