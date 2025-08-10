import { motion } from "framer-motion";
import { Wallet, TrendingUp } from "lucide-react";

const WalletHeader = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card shadow-card rounded-b-2xl p-6 mb-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-glow"
          >
            <Wallet className="w-5 h-5 text-primary-foreground" />
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Алексей Смирнов</h1>
            <p className="text-sm text-muted-foreground">@aleksey_crypto</p>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-right"
        >
          <div className="flex items-center gap-1 text-primary">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">+2.45%</span>
          </div>
        </motion.div>
      </div>
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-muted rounded-xl p-4 mb-4"
      >
        <p className="text-sm text-muted-foreground mb-1">Общий баланс</p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">245,780.50</span>
          <span className="text-lg text-accent font-medium">₽</span>
        </div>
        <p className="text-sm text-primary mt-1">≈ $2,645.32 USD</p>
      </motion.div>

      {/* Personal Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="bg-muted/50 rounded-xl p-4 space-y-3"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-muted-foreground">Ваш ID</span>
          <span className="font-mono text-sm text-foreground">1,247,859</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-muted-foreground">Холд</span>
          <span className="text-sm text-foreground">3 активных</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-muted-foreground">Вы с нами</span>
          <span className="text-sm text-foreground">9 месяцев 15 дней</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between"
        >
          <span className="text-sm text-muted-foreground">Оборот</span>
          <span className="text-sm text-accent font-medium">1,245,780 ₽</span>
        </motion.div>
      </motion.div>
    </motion.header>
  );
};

export default WalletHeader;