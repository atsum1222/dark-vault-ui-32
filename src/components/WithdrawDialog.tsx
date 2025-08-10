import { useState } from "react";
import { motion } from "framer-motion";
import { Users, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import AddressBook from "./AddressBook";
import PinCodeDialog from "./PinCodeDialog";

interface WithdrawDialogProps {
  children: React.ReactNode;
}

const WithdrawDialog = ({ children }: WithdrawDialogProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); // 1: select currency, 2: enter details
  const [showAddressBook, setShowAddressBook] = useState(false);
  const [showPinCode, setShowPinCode] = useState(false);
  const { toast } = useToast();

  const currencies = [
    { 
      value: "BTC", 
      label: "Bitcoin", 
      balance: "0.00234567",
      balanceRub: "15,420.50",
      network: "Bitcoin"
    },
    { 
      value: "ETH", 
      label: "Ethereum", 
      balance: "1.25",
      balanceRub: "89,750.00",
      network: "ERC20"
    },
    { 
      value: "USDT", 
      label: "Tether", 
      balance: "1,250.00",
      balanceRub: "112,500.00",
      network: "TRC20"
    },
    { 
      value: "BNB", 
      label: "BNB", 
      balance: "2.5",
      balanceRub: "67,500.00",
      network: "BEP20"
    }
  ];

  const selectedCurrencyData = currencies.find(c => c.value === selectedCurrency);
  const maxBalance = selectedCurrencyData ? parseFloat(selectedCurrencyData.balanceRub.replace(/,/g, '')) : 0;

  const handleCurrencySelect = (currency: string) => {
    setSelectedCurrency(currency);
    setStep(2);
  };

  const handleAddressSelect = (selectedAddress: string) => {
    setAddress(selectedAddress);
    setShowAddressBook(false);
  };

  const handleAmountButton = (type: string) => {
    if (!selectedCurrencyData) return;
    
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
    if (!selectedCurrency) {
      toast({
        title: "Ошибка",
        description: "Выберите криптовалюту",
        variant: "destructive"
      });
      return;
    }

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
    setSelectedCurrency("");
    setAddress("");
    setAmount("");
    
    toast({
      title: "Заявка принята",
      description: "Ваш вывод средств находится в обработке"
    });
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setSelectedCurrency("");
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
            {step === 1 ? (
              <div>
                <Label>Выберите криптовалюту</Label>
                <div className="grid gap-2 mt-2">
                  {currencies.map((currency) => (
                    <Button
                      key={currency.value}
                      variant="outline"
                      className="h-auto p-4 justify-between hover:bg-gradient-to-r hover:from-primary/20 hover:via-transparent hover:to-primary/20 transition-all duration-300"
                      onClick={() => handleCurrencySelect(currency.value)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {currency.value.charAt(0)}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{currency.label}</div>
                          <div className="text-sm text-muted-foreground">{currency.network}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{currency.balance} {currency.value}</div>
                        <div className="text-sm text-muted-foreground">{currency.balanceRub} ₽</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-4"
              >
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setStep(1)}
                    className="p-1"
                  >
                    ←
                  </Button>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {selectedCurrency.charAt(0)}
                    </div>
                    <span className="font-medium">{selectedCurrencyData?.label}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Доступно для вывода</div>
                  <div className="font-semibold">
                    {selectedCurrencyData.balance} {selectedCurrency}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    ≈ {selectedCurrencyData.balanceRub} ₽
                  </div>
                </div>

                <div>
                  <Label htmlFor="address">Адрес кошелька {selectedCurrencyData.network}</Label>
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
            )}
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