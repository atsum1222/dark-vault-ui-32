import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Delete, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface PinCodeDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  isChangingPin?: boolean;
}

const PinCodeDialog = ({ open, onClose, onSuccess, isChangingPin = false }: PinCodeDialogProps) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1); // 1: old pin, 2: new pin, 3: confirm new pin
  const [oldPin, setOldPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      setPin(["", "", "", ""]);
      setStep(1);
      setOldPin("");
      setNewPin("");
    }
  }, [open]);

  const handleNumberPress = (number: string) => {
    const firstEmptyIndex = pin.findIndex(digit => digit === "");
    if (firstEmptyIndex !== -1) {
      const newPin = [...pin];
      newPin[firstEmptyIndex] = number;
      setPin(newPin);
    }
  };

  const handleDelete = () => {
    const lastFilledIndex = pin.map((digit, index) => digit !== "" ? index : -1)
      .filter(index => index !== -1)
      .pop();
    
    if (lastFilledIndex !== undefined) {
      const newPin = [...pin];
      newPin[lastFilledIndex] = "";
      setPin(newPin);
    }
  };

  const handleClear = () => {
    setPin(["", "", "", ""]);
  };

  const handleConfirm = async () => {
    if (pin.some(digit => digit === "")) {
      toast({
        title: "Ошибка",
        description: "Введите все 4 цифры PIN-кода",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate PIN verification
    setTimeout(() => {
      setIsLoading(false);
      const pinCode = pin.join("");
      
      if (!isChangingPin) {
        // Regular PIN verification
        if (pinCode.length === 4) {
          onSuccess();
        } else {
          toast({
            title: "Неверный PIN-код",
            description: "Попробуйте еще раз",
            variant: "destructive"
          });
          setPin(["", "", "", ""]);
        }
      } else {
        // PIN change process
        if (step === 1) {
          // Verify old PIN
          setOldPin(pinCode);
          setPin(["", "", "", ""]);
          setStep(2);
        } else if (step === 2) {
          // Set new PIN
          setNewPin(pinCode);
          setPin(["", "", "", ""]);
          setStep(3);
        } else if (step === 3) {
          // Confirm new PIN
          if (pinCode === newPin) {
            toast({
              title: "Успешно",
              description: "PIN-код изменен"
            });
            onSuccess();
          } else {
            toast({
              title: "Ошибка",
              description: "PIN-коды не совпадают",
              variant: "destructive"
            });
            setPin(["", "", "", ""]);
            setStep(2);
            setNewPin("");
          }
        }
      }
    }, 1000);
  };

  const getTitle = () => {
    if (!isChangingPin) return "Введите PIN-код";
    if (step === 1) return "Введите старый PIN-код";
    if (step === 2) return "Введите новый PIN-код";
    return "Подтвердите новый PIN-код";
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-center">{getTitle()}</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="flex justify-center gap-3">
            {pin.map((digit, index) => (
              <motion.div
                key={index}
                className="w-12 h-12 flex items-center justify-center text-lg font-bold border border-input rounded-md bg-background"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                {digit ? (
                  <span>{digit}</span>
                ) : (
                  <div className="w-2 h-2 rounded-full bg-muted" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Virtual Keyboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-3 gap-3"
          >
            {/* Row 1: 1, 2, 3 */}
            {[1, 2, 3].map((num) => (
              <Button
                key={num}
                variant="outline"
                size="lg"
                className="h-12 text-lg font-semibold"
                onClick={() => handleNumberPress(num.toString())}
                disabled={isLoading}
              >
                {num}
              </Button>
            ))}
            
            {/* Row 2: 4, 5, 6 */}
            {[4, 5, 6].map((num) => (
              <Button
                key={num}
                variant="outline"
                size="lg"
                className="h-12 text-lg font-semibold"
                onClick={() => handleNumberPress(num.toString())}
                disabled={isLoading}
              >
                {num}
              </Button>
            ))}
            
            {/* Row 3: 7, 8, 9 */}
            {[7, 8, 9].map((num) => (
              <Button
                key={num}
                variant="outline"
                size="lg"
                className="h-12 text-lg font-semibold"
                onClick={() => handleNumberPress(num.toString())}
                disabled={isLoading}
              >
                {num}
              </Button>
            ))}
            
            {/* Row 4: Delete, 0, Clear */}
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={handleDelete}
              disabled={isLoading}
            >
              <Delete className="w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="h-12 text-lg font-semibold"
              onClick={() => handleNumberPress("0")}
              disabled={isLoading}
            >
              0
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="h-12"
              onClick={handleClear}
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </Button>
          </motion.div>

          <div className="space-y-3">
            <Button 
              onClick={handleConfirm} 
              className="w-full"
              disabled={isLoading || pin.some(digit => digit === "")}
            >
              {isLoading ? "Проверка..." : "Подтвердить"}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full"
              disabled={isLoading}
            >
              Отмена
            </Button>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default PinCodeDialog;