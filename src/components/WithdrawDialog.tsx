import { useState } from "react";
import { motion } from "framer-motion";
import { Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import AddressBook from "./AddressBook";
import PinCodeDialog from "./PinCodeDialog";

interface WithdrawDialogProps {
  children: React.ReactNode;
}

const WithdrawDialog = ({ children }: WithdrawDialogProps) => {
  const [open, setOpen] = useState(false);
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [showPinCode, setShowPinCode] = useState(false);
  const { toast } = useToast();

  const maxBalance = 150000; // Available balance

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setShowAddressBook(false);
  };

  const handleAmountButton = (type: string) => {
    switch (type) {
      case "half":
        setAmount((maxBalance / 2).toString());
        break;
      case "all":
        setAmount(maxBalance.toString());
        break;
      case "clear":
        setAmount("");
        break;
    }
  };

  const handleWithdraw = () => {
    if (!address) {
      toast({
        title: "Ошибка",
        description: "Введите адрес кошелька",
        variant: "destructive"
      });
      return;
    }
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму",
        variant: "destructive"
      });
      return;
    }

    if (parseFloat(amount) > maxBalance) {
      toast({
        title: "Ошибка",
        description: "Недостаточно средств",
        variant: "destructive"
      });
      return;
    }

    setShowPinCode(true);
  };

  const handlePinSuccess = () => {
    setShowPinCode(false);
    setOpen(false);
    setAddress("");
    setAmount("");
    
    toast({
      title: "Заявка принята",
      description: "Ваш вывод средств находится в обработке"
    });
  };

  const handleClose = () => {
    setOpen(false);
    setAddress("");
    setAmount("");
    setShowAddressBook(false);
    setShowPinCode(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild onClick={() => setOpen(true)}>
          {children}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Вывод средств</DialogTitle>
          </DialogHeader>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="address">Адрес кошелька USDT BEP20</Label>
              <div className="relative mt-1">
                <Input
                  id="address"
                  placeholder="Введите адрес кошелька"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="pr-10"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                  onClick={() => setShowAddressBook(true)}
                >
                  <Users className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="withdraw-amount">Сумма вывода (₽)</Label>
              <Input
                id="withdraw-amount"
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Доступно: {maxBalance.toLocaleString()} ₽
              </p>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAmountButton("half")}
              >
                1/2
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAmountButton("all")}
              >
                Все
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleAmountButton("clear")}
                className="col-span-2"
              >
                <X className="w-4 h-4 mr-1" />
                Очистить
              </Button>
            </div>

            <Button onClick={handleWithdraw} className="w-full">
              Вывести
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>

      <AddressBook
        open={showAddressBook}
        onClose={() => setShowAddressBook(false)}
        onSelect={handleAddressSelect}
      />

      <PinCodeDialog
        open={showPinCode}
        onClose={() => setShowPinCode(false)}
        onSuccess={handlePinSuccess}
      />
    </>
  );
};

export default WithdrawDialog;