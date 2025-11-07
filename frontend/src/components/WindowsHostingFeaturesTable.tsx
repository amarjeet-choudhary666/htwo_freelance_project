import { Check } from "lucide-react";

export default function WindowsHostingFeaturesTable() {
  const features = [
    "SSD Disk", "MVC Framework", "XML Support", "Virus Protection", "Free / Instant Setup", "Silverlight", "Crystal Report",
    "Spam Filtering", "Free Support", "ASP.NET 3.0 to 4.6", "Email Accounts", "DNS management", "MS Access", "PHP 5/6/7",
    "POP / SMTP Access", "Hotlink Protection", "MySQL", "CGI / Perl", "Web based mail", "Backup Manager", "CS Cart",
    "Cube Cart", "Magento", "Zen Cart", "Os Commerce", "CRE Loaded", "Free SEO Tools", "Raw Access Logs"
  ];

  const numCols = 7;
  const numRows = 4;

  // Take exactly 28 features (7 cols × 4 rows)
  const finalFeatures = features.slice(0, numCols * numRows);

  // Split features into 4 rows of 7 columns each
  const rows = [];
  for (let i = 0; i < numRows; i++) {
    const start = i * numCols;
    const end = start + numCols;
    rows.push(finalFeatures.slice(start, end));
  }

  return (
    <section className="py-16 bg-gray-50 font-poppins">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
          Windows Web Hosting Features
        </h2>

        <div className="overflow-x-auto">
          <table className="mx-auto w-full border border-gray-200">
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-gray-200">
                  {row.map((feature, colIdx) => (
                    <td
                      key={colIdx}
                      className="py-4 px-3 text-center border-r border-gray-200 last:border-r-0"
                    >
                      <div className="flex items-center justify-start gap-2">
                        <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-700 whitespace-nowrap">{feature}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
    
  );
}