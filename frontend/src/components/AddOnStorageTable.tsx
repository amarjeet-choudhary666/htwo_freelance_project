import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function AddOnStorageTable() {
  const storageOptions = [
    { name: '480 GB Enterprise SSD', type: '480 GB SSD', price: '₹ 1,200' },
    { name: '960 GB Enterprise SSD', type: '960 GB SSD', price: '₹ 2,000' },
    { name: '1.92 TB Enterprise SSD', type: '1.92 TB SSD', price: '₹ 3,000' },
    { name: '3.84 TB Enterprise SSD', type: '3.84 TB SSD', price: '₹ 5,000' },
    { name: '3.2 TB NVMe (Platinum Servers Only)', type: '3.2 TB NVMe', price: '₹ 3,690' },
    { name: '6.4 TB NVMe (Platinum Servers Only)', type: '6.4 TB NVMe', price: '₹ 7,150' },
    { name: '15.3 TB NVMe (Platinum Servers Only)', type: '15.3 TB NVMe', price: '₹ 15,400' },
  ];

  return (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-200 overflow-x-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Add-On Storage Options</h2>
      <Table className="w-full">
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead className="text-left text-black">Storage Name</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {storageOptions.map((option, index) => (
            <TableRow key={index} className="hover:bg-gray-50 transition-colors">
              <TableCell className="font-medium text-gray-900">{option.name}</TableCell>
              <TableCell className="text-center text-gray-700">{option.type}</TableCell>
              <TableCell className="text-center font-bold text-green-600">{option.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
