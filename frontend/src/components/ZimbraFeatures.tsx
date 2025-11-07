export default function ZimbraFeaturesTable() {
  const tableData = [
    {
      category: "General",
      features: ["No extra costs", "Virtualized mailboxes", "Easy deployment", "Easily Migrate Mailboxes"],
    },
    {
      category: "Support & Security",
      features: ["24/7 support team", "Secure data centers", "Affordable", "Personalize your display"],
    },
    {
      category: "Productivity",
      features: ["Manage accounts", "Quick Search", "Link Tasks to Emails", "Find Attachments Easily"],
    },
    {
      category: "Cloud & Tools",
      features: ["Cloud-based File Storage", "Follow-up Flagging", "Powerful Spell Check", "Personalize Contacts"],
    },
  ];

  return (
    <section className="py-16 bg-gray-50 font-poppins">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Business Email (Zimbra) Features
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
              {Array.from({ length: 4 }).map((_, rowIdx) => (
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
