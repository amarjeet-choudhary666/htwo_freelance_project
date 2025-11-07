export default function BusinessEmailFeaturesTable() {
  const features = [
    "No extra costs",
    "Virtualized mailboxes",
    "Easy deployment",
    "Easily Migrate Mailboxes",
    "24/7 support team",
    "Secure data centers",
    "Affordable",
    "Personalize your display",
    "Manage accounts",
    "Quick Search",
    "Link Tasks to Emails",
    "Find Attachments Easily",
    "Cloud-based File Storage",
    "Follow-up Flagging",
    "Powerful Spell Check",
    "Personalize Contacts"
  ];

  // Split features into rows of 4
  const rows = [];
  for (let i = 0; i < features.length; i += 4) {
    rows.push(features.slice(i, i + 4));
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-8">
          Business Email (Zimbra) Features
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
            <tbody>
              {rows.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-200">
                  {row.map((feature, index) => (
                    <td
                      key={index}
                      className="py-4 px-6 text-gray-700 text-center font-medium border-r border-gray-200 last:border-r-0"
                    >
                      {feature}
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
