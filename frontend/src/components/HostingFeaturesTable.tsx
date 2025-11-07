export default function HostingFeaturesTable() {
  const tableData = [
    {
      category: "Email Features",
      features: ["Webmail", "POP3 Access", "Auto Responders", "Mailing Lists", "IMAP Support"],
    },
    {
      category: "Frameworks",
      features: ["Laravel", "CakePHP", "CodeIgniter", "Zend", "Symfony"],
    },
    {
      category: "Programming Support",
      features: ["PHP 5, 6,7", "Apache Web Server", "phpMyAdmin", "MySQL", "Cron"],
    },
    {
      category: "One Click Installation",
      features: ["WordPress", "Joomla", "Drupal", "Moodle", "PrestaShop"],
    },
  ];

  return (
    <section className="py-16 bg-gray-50 font-poppins">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Linux Web Hosting Features
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <thead className="bg-gray-100">
              <tr>
                {tableData.map((col, idx) => (
                  <th
                    key={idx}
                    className="text-left py-3 px-4 text-gray-700 font-semibold border-b border-gray-200"
                  >
                    {col.category}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50 transition">
                  {tableData.map((col, colIdx) => (
                    <td
                      key={colIdx}
                      className="py-3 px-4 text-gray-600 border-b border-gray-200"
                    >
                      {col.features[rowIdx]}
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
