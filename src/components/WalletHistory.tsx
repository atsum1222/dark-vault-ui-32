import { motion } from "framer-motion";
import { History, ArrowDownToLine, ArrowUpFromLine } from "lucide-react";

interface Transaction {
  id: string;
  type: "deposit" | "withdraw";
  amount: string;
  amountRub: string;
  date: string;
  time: string;
}

const WalletHistory = () => {
  const transactions: Transaction[] = [
    {
      id: "1",
      type: "deposit",
      amount: "500.00",
      amountRub: "45,000.00",
      date: "21.01.2021",
      time: "13:13"
    },
    {
      id: "2",
      type: "withdraw",
      amount: "250.00",
      amountRub: "22,500.00",
      date: "20.01.2021",
      time: "10:25"
    },
    {
      id: "3",
      type: "deposit",
      amount: "1000.00",
      amountRub: "90,000.00",
      date: "19.01.2021",
      time: "16:42"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="bg-card shadow-card rounded-2xl p-6"
    >
      <div className="flex items-center gap-2 mb-4">
        <History className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">История кошелька</h2>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 * index }}
            className="bg-muted rounded-xl p-4 flex items-center justify-between"
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${
                transaction.type === "deposit" 
                  ? "bg-primary/10 text-primary" 
                  : "bg-accent/10 text-accent"
              }`}>
                {transaction.type === "deposit" ? (
                  <ArrowDownToLine className="w-4 h-4" />
                ) : (
                  <ArrowUpFromLine className="w-4 h-4" />
                )}
              </div>
              <div>
                <div className="font-medium text-foreground">
                  {transaction.type === "deposit" ? "Пополнение" : "Вывод"}
                </div>
                <div className="text-sm text-muted-foreground">
                  {transaction.date} {transaction.time}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold text-foreground">
                {transaction.type === "deposit" ? "+" : "-"}{transaction.amount} USDT
              </div>
              <div className="text-sm text-muted-foreground">
                {transaction.amountRub} ₽
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default WalletHistory;