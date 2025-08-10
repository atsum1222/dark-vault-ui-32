import { motion } from "framer-motion";
import { Plus, Minus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import DepositDialog from "./DepositDialog";
import WithdrawDialog from "./WithdrawDialog";
import ExchangeDialog from "./ExchangeDialog";

const ActionButtons = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-4 mb-6">
      {/* Main buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="grid grid-cols-2 gap-3"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          <DepositDialog>
            <Button
              variant="default"
              className="w-full h-12 gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4" />
              Пополнить
            </Button>
          </DepositDialog>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
        >
          <WithdrawDialog>
            <Button
              variant="secondary"
              className="w-full h-12 gap-2"
            >
              <Minus className="w-4 h-4" />
              Вывести
            </Button>
          </WithdrawDialog>
        </motion.div>
      </motion.div>

      {/* Exchange button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.75, type: "spring", stiffness: 200 }}
      >
        <ExchangeDialog>
          <Button
            variant="outline"
            className="w-full h-12 gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m0-4l4-4" />
            </svg>
            Обменять
          </Button>
        </ExchangeDialog>
      </motion.div>

      {/* Settings button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.85, type: "spring", stiffness: 200 }}
      >
        <Button
          variant="outline"
          className="w-full h-12 gap-2"
          onClick={() => navigate("/settings")}
        >
          <Settings className="w-4 h-4" />
          Настройки
        </Button>
      </motion.div>
    </div>
  );
};

export default ActionButtons;