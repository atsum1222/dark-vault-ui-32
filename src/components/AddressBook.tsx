import { useState } from "react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Address {
  id: string;
  name: string;
  address: string;
  network: string;
  currency: string;
}

interface AddressBookProps {
  open: boolean;
  onClose: () => void;
  onSelect: (address: string) => void;
}

const AddressBook = ({ open, onClose, onSelect }: AddressBookProps) => {
  const { toast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "1",
      name: "Основной кошелек",
      address: "0x742d35Cc6635C0532925a3b8D400B41B354e8e8b",
      network: "BEP20",
      currency: "BNB"
    },
    {
      id: "2",
      name: "Резервный кошелек",
      address: "0x8ba1f109551bD432803012645Hac136c49cEB1c",
      network: "TRC20",
      currency: "USDT"
    },
    {
      id: "3",
      name: "Торговый счет",
      address: "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
      network: "ERC20",
      currency: "ETH"
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    network: "BEP20",
    currency: "BTC"
  });

  const currencies = [
    { value: "BTC", label: "Bitcoin (BTC)", networks: ["Bitcoin", "BEP20"] },
    { value: "ETH", label: "Ethereum (ETH)", networks: ["ERC20", "BEP20"] },
    { value: "USDT", label: "Tether (USDT)", networks: ["TRC20", "ERC20", "BEP20"] },
    { value: "BNB", label: "BNB (BNB)", networks: ["BEP20"] },
    { value: "ADA", label: "Cardano (ADA)", networks: ["Cardano"] },
    { value: "DOT", label: "Polkadot (DOT)", networks: ["Polkadot"] },
    { value: "MATIC", label: "Polygon (MATIC)", networks: ["Polygon", "ERC20"] },
    { value: "SOL", label: "Solana (SOL)", networks: ["Solana"] }
  ];

  const networks = [
    { value: "BEP20", label: "BEP20 (BSC)" },
    { value: "ERC20", label: "ERC20 (Ethereum)" },
    { value: "TRC20", label: "TRC20 (Tron)" },
    { value: "Polygon", label: "Polygon" },
    { value: "Solana", label: "Solana" },
    { value: "Bitcoin", label: "Bitcoin" },
    { value: "Cardano", label: "Cardano" },
    { value: "Polkadot", label: "Polkadot" }
  ];

  const selectedCurrency = currencies.find(c => c.value === formData.currency);
  const availableNetworks = selectedCurrency ? 
    networks.filter(n => selectedCurrency.networks.includes(n.value)) : 
    networks;

  const handleSelect = (address: string) => {
    onSelect(address);
    onClose();
  };

  const handleAdd = () => {
    if (!formData.name || !formData.address) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    const newAddress: Address = {
      id: Date.now().toString(),
      ...formData
    };

    setAddresses([...addresses, newAddress]);
    setFormData({ name: "", address: "", network: "BEP20", currency: "BTC" });
    setShowAddForm(false);
    
    toast({
      title: "Успешно",
      description: "Адрес добавлен в книгу"
    });
  };

  const handleEdit = (address: Address) => {
    setEditingAddress(address);
    setFormData({
      name: address.name,
      address: address.address,
      network: address.network,
      currency: address.currency
    });
    setShowAddForm(true);
  };

  const handleUpdate = () => {
    if (!formData.name || !formData.address || !editingAddress) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }

    setAddresses(addresses.map(addr => 
      addr.id === editingAddress.id 
        ? { ...addr, ...formData }
        : addr
    ));

    setFormData({ name: "", address: "", network: "BEP20", currency: "BTC" });
    setShowAddForm(false);
    setEditingAddress(null);
    
    toast({
      title: "Успешно",
      description: "Адрес обновлен"
    });
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    toast({
      title: "Успешно",
      description: "Адрес удален"
    });
  };

  const resetForm = () => {
    setFormData({ name: "", address: "", network: "BEP20", currency: "BTC" });
    setShowAddForm(false);
    setEditingAddress(null);
  };

  const handleCurrencyChange = (currency: string) => {
    const currencyData = currencies.find(c => c.value === currency);
    const defaultNetwork = currencyData?.networks[0] || "BEP20";
    
    setFormData({ 
      ...formData, 
      currency, 
      network: defaultNetwork 
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            Адресная книга
          </DialogTitle>
        </DialogHeader>
        
        {showAddForm ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div>
              <Label htmlFor="name">Название</Label>
              <Input
                id="name"
                placeholder="Мой кошелек"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="currency">Криптовалюта</Label>
              <Select value={formData.currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                          {currency.value.charAt(0)}
                        </div>
                        {currency.label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="network">Сеть</Label>
              <Select value={formData.network} onValueChange={(value) => setFormData({ ...formData, network: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {availableNetworks.map((network) => (
                    <SelectItem key={network.value} value={network.value}>
                      {network.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="address">Адрес кошелька</Label>
              <Input
                id="address"
                placeholder="0x... или другой формат адреса"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            <div className="flex gap-2">
              <Button onClick={editingAddress ? handleUpdate : handleAdd} className="flex-1">
                {editingAddress ? "Обновить" : "Добавить"}
              </Button>
              <Button variant="outline" onClick={resetForm} className="flex-1">
                Отмена
              </Button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            {addresses.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-muted rounded-lg p-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 cursor-pointer" onClick={() => handleSelect(item.address)}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                        {item.currency.charAt(0)}
                      </div>
                      <p className="font-medium text-sm">{item.name}</p>
                      <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                        {item.currency}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-mono mb-1">
                      {item.address.slice(0, 12)}...{item.address.slice(-8)}
                    </p>
                    <span className="text-xs bg-secondary text-secondary-foreground px-1.5 py-0.5 rounded-full">
                      {item.network}
                    </span>
                  </div>
                  <div className="flex gap-1 ml-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleEdit(item)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete(item.id)}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
            
            {addresses.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>Адресная книга пуста</p>
              </div>
            )}
            
            {!showAddForm && (
              <div className="mt-4">
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="w-full gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Добавить адрес
                </Button>
              </div>
            )}
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddressBook;