import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import AddressBook from "@/components/AddressBook";
import PinCodeDialog from "@/components/PinCodeDialog";

const Settings = () => {
  const navigate = useNavigate();
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [showPinChange, setShowPinChange] = useState(false);

  return (
    <div className="telegram-viewport bg-background min-h-screen">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-md mx-auto bg-background min-h-screen"
      >
        {/* Header */}
        <div className="flex items-center gap-3 p-4 bg-card shadow-card">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Настройки</h1>
        </div>

        {/* Settings Items */}
        <div className="p-4 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card shadow-card rounded-2xl overflow-hidden"
          >
            <Button
              variant="ghost"
              onClick={() => setShowAddressBook(true)}
              className="w-full p-4 h-auto justify-start rounded-none hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-primary/10 text-primary">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">Адресная книга</div>
                  <div className="text-sm text-muted-foreground">
                    Управление сохранёнными адресами
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card shadow-card rounded-2xl overflow-hidden"
          >
            <Button
              variant="ghost"
              onClick={() => setShowPinChange(true)}
              className="w-full p-4 h-auto justify-start rounded-none hover:bg-muted"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-full bg-accent/10 text-accent">
                  <Lock className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="font-medium text-foreground">Изменить PIN-код</div>
                  <div className="text-sm text-muted-foreground">
                    Безопасность вашего кошелька
                  </div>
                </div>
              </div>
            </Button>
          </motion.div>
        </div>

        {/* Dialogs */}
        <AddressBook
          open={showAddressBook}
          onClose={() => setShowAddressBook(false)}
          onSelect={() => {}} // Not used in settings
        />

        <PinCodeDialog
          open={showPinChange}
          onClose={() => setShowPinChange(false)}
          onSuccess={() => setShowPinChange(false)}
          isChangingPin={true}
        />
      </motion.div>
    </div>
  );
};

export default Settings;