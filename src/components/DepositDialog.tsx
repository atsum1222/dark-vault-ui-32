import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface DepositDialogProps {
  children: React.ReactNode;
}

const DepositDialog = ({ children }: DepositDialogProps) => {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [showWallet, setShowWallet] = useState(false);
  const [timeLeft, setTimeLeft] = useState(7200); // 2 hours in seconds
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const walletAddress = "TQn9Y2khEsLJW1ChVWFMSMeRDow5KcbLSE";

  useEffect(() => {
    if (showWallet && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [showWallet, timeLeft]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleContinue = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Ошибка",
        description: "Введите корректную сумму",
        variant: "destructive"
      });
      return;
    }
    setShowWallet(true);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Скопировано",
        description: "Адрес кошелька скопирован в буфер обмена"
      });
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать адрес",
        variant: "destructive"
      });
    }
  };

  const handleClose = () => {
    setOpen(false);
    setAmount("");
    setShowWallet(false);
    setTimeLeft(7200);
    setCopied(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Пополнение баланса</DialogTitle>
        </DialogHeader>
        
        {!showWallet ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="amount">Сумма пополнения (₽)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="Введите сумму"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button onClick={handleContinue} className="w-full">
              Продолжить
            </Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="text-center space-y-2">
              <p className="text-sm text-muted-foreground">Сумма к пополнению</p>
              <p className="text-2xl font-bold text-primary">{amount} ₽</p>
            </div>
            
            <div className="space-y-2">
              <Label>Адрес кошелька USDT TRC20</Label>
              <div className="flex items-center gap-2">
                <Input
                  value={walletAddress}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  size="sm"
                  variant="outline"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-1">Время на оплату</p>
              <p className="text-xl font-bold text-accent">
                {formatTime(timeLeft)}
              </p>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Переведите точную сумму на указанный адрес</p>
              <p>• Средства поступят в течение 10-30 минут</p>
              <p>• При просрочке платежа создайте новую заявку</p>
            </div>

            <Button onClick={handleClose} variant="outline" className="w-full">
              Закрыть
            </Button>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DepositDialog;