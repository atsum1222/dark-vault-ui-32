import { motion } from "framer-motion";
import WalletHeader from "@/components/WalletHeader";
import HoldsTable from "@/components/HoldsTable";
import ActionButtons from "@/components/ActionButtons";
import WalletHistory from "@/components/WalletHistory";
import { Toaster } from "@/components/ui/toaster";

const Index = () => {
  return (
    <div className="telegram-viewport bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto bg-background min-h-screen"
      >
        <WalletHeader />
        <div className="px-4">
          <ActionButtons />
          <HoldsTable />
          <WalletHistory />
          <div className="pb-8" />
        </div>
      </motion.div>
      <Toaster />
    </div>
  );
};

export default Index;
