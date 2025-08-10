import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AddressBookProps {
  open: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}

const AddressBook = ({ open, onClose, onSelect }: AddressBookProps) => {
  const addresses = [
    {
      name: "Основной кошелек",
      address: "0x742d35Cc6635C0532925a3b8D400B41B354e8e8b",
      network: "BEP20"
    },
    {
      name: "Резервный кошелек",
      address: "0x8ba1f109551bD432803012645Hac136c49cEB1c",
      network: "BEP20"
    },
    {
      name: "Торговый счет",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      network: "BEP20"
    }
  ];

  const handleSelect = (address: string) => {
    onSelect(address);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Адресная книга</DialogTitle>
        </DialogHeader>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {addresses.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-muted rounded-lg p-3 cursor-pointer hover:bg-muted/80 transition-colors"
              onClick={() => handleSelect(item.address)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm">{item.name}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {item.address.slice(0, 8)}...{item.address.slice(-6)}
                  </p>
                  <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    {item.network}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
          
          {addresses.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <p>Адресная книга пуста</p>
            </div>
          )}
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default AddressBook;