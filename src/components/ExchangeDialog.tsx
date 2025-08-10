import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ExchangeDialogProps {
  children: React.ReactNode;
}

const ExchangeDialog = ({ children }: ExchangeDialogProps) => {
  const [open, setOpen] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState(1); // 1: select from, 2: select to, 3: enter amount
  const { toast } = useToast();

  const currencies = [
    { 
      value: "BTC", 
      label: "Bitcoin", 
      balance: "0.00234567",
      rate: 4200000, // rate in rubles
      icon: "₿"
    },
    { 
      value: "ETH", 
      label: "Ethereum", 
      balance: "1.25",
      rate: 280000,
      icon: "Ξ"
    },
    { 
      value: "USDT", 
      label: "Tether", 
      balance: "1,250.00",
      rate: 90,
      icon: "₮"
    },
    { 
      value: "BNB", 
      label: "BNB", 
      balance: "2.5",
      rate: 27000,
      icon: "⬡"
    }
  ];

  const fromCurrencyData = currencies.find(c => c.value === fromCurrency);
  const toCurrencyData = currencies.find(c => c.value === toCurrency);

  const calculateExchange = () => {
    if (!fromCurrencyData || !toCurrencyData || !amount) return "0";
    const fromValue = parseFloat(amount) * fromCurrencyData.rate;
    const toAmount = fromValue / toCurrencyData.rate;
    return toAmount.toFixed(8);
  };

  const handleCurrencySelect = (currency: string) => {
    if (step === 1) {
      setFromCurrency(currency);
      setStep(2);
    } else if (step === 2) {
      if (currency === fromCurrency) {
        toast({
          title: "Ошибка",
          description: "Выберите другую валюту для обмена",
          variant: "destructive"
        });
        return;
      }
      setToCurrency(currency);
      setStep(3);
    }
  };

  const handleExchange = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Обмен выполнен",
      description: `${amount} ${fromCurrency} → ${calculateExchange()} ${toCurrency}`
    });
    
    setOpen(false);
    setStep(1);
    setFromCurrency("");
    setToCurrency("");
    setAmount("");
  };

  const handleClose = () => {
    setOpen(false);
    setStep(1);
    setFromCurrency("");
    setToCurrency("");
    setAmount("");
  };

  const getTitle = () => {
    if (step === 1) return "Обменять с";
    if (step === 2) return "Обменять на";
    return "Сумма обмена";
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          {step <= 2 ? (
            <div>
              <div className="grid gap-2">
                {currencies.map((currency) => (
                  <Button
                    key={currency.value}
                    variant="outline"
                    className="h-auto p-4 justify-between"
                    onClick={() => handleCurrencySelect(currency.value)}
                    disabled={step === 2 && currency.value === fromCurrency}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {currency.icon}
                      </div>
                      <div className="text-left">
                        <div className="font-medium">{currency.label}</div>
                        <div className="text-sm text-muted-foreground">
                          {currency.balance} {currency.value}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground">
                        ≈ {currency.rate.toLocaleString()} ₽
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
              
              {step === 1 && (
                <Button variant="outline" onClick={handleClose} className="w-full mt-4">
                  Отмена
                </Button>
              )}
              
              {step === 2 && (
                <Button variant="outline" onClick={() => setStep(1)} className="w-full mt-4">
                  Назад
                </Button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4"
            >
              <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {fromCurrencyData?.icon}
                    </div>
                    <span className="font-medium">{fromCurrencyData?.label}</span>
                  </div>
                  <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                      {toCurrencyData?.icon}
                    </div>
                    <span className="font-medium">{toCurrencyData?.label}</span>
                  </div>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  Курс: 1 {fromCurrency} = {toCurrencyData && fromCurrencyData ? 
                    (fromCurrencyData.rate / toCurrencyData.rate).toFixed(8) : "0"} {toCurrency}
                </div>
              </div>

              <div>
                <Label htmlFor="exchange-amount">Сумма ({fromCurrency})</Label>
                <Input
                  id="exchange-amount"
                  type="number"
                  placeholder="Введите сумму"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="mt-1"
                />
              </div>

              {amount && (
                <div className="bg-muted rounded-lg p-3">
                  <div className="text-sm text-muted-foreground">Получите</div>
                  <div className="font-semibold text-lg">
                    {calculateExchange()} {toCurrency}
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button onClick={handleExchange} className="flex-1">
                  Обменять
                </Button>
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Назад
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ExchangeDialog;