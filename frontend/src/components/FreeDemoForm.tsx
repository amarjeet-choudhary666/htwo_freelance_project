import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import emailjs from "@emailjs/browser";
import SuccessPopup from "./SuccessPopup";

// ✅ Static country code list (no API needed)
const COUNTRY_CODES = [
  { code: "+91", name: "India" },
  { code: "+1", name: "United States / Canada" },
  { code: "+44", name: "United Kingdom" },
  { code: "+61", name: "Australia" },
  { code: "+49", name: "Germany" },
  { code: "+971", name: "UAE" },
  { code: "+81", name: "Japan" },
  { code: "+33", name: "France" },
  { code: "+39", name: "Italy" },
  { code: "+34", name: "Spain" },
  { code: "+7", name: "Russia" },
  { code: "+55", name: "Brazil" },
  { code: "+86", name: "China" },
  { code: "+60", name: "Malaysia" },
  { code: "+62", name: "Indonesia" },
  { code: "+63", name: "Philippines" },
  { code: "+64", name: "New Zealand" },
  { code: "+65", name: "Singapore" },
  { code: "+852", name: "Hong Kong" },
  { code: "+90", name: "Turkey" },
];

const FreeDemoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "+91",
    service: "",
    question: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setFormData((prev) => ({ ...prev, phone: value.replace(/\D/g, "").slice(0, 10) })); // ✅ Only 10 digits
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidPhone = () => formData.phone.length === 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhone()) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_DEMO_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: `${formData.country}${formData.phone}`,
          country: formData.country,
          service: formData.service,
          message: formData.question,
          to_name: "Htwo Team",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_API
      );

      setShowSuccessPopup(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        country: "",
        service: "",
        question: "",
      });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send demo request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    formData.name &&
    formData.email &&
    formData.country &&
    formData.service &&
    isValidPhone();

  return (
    <>
      <div className="w-full max-w-lg bg-white text-black p-4 sm:p-6 rounded-xl shadow-lg mx-auto font-poppins">
        <h2 className="text-lg sm:text-xl font-bold mb-4 text-center">Get Free Demo Now</h2>
        <form className="space-y-3 sm:space-y-4" onSubmit={handleSubmit}>
          
          {/* Name */}
          <div>
            <Label className="text-sm">Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>

          {/* Email */}
          <div>
            <Label className="text-sm">Email</Label>
            <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>

          {/* Phone + Country Code */}
          <div>
            <Label className="text-sm">Phone Number</Label>
            <div className="flex">
              <select
                name="country"
                value={formData.country}
                onChange={handleSelectChange}
                className="w-28 h-9 px-2 border rounded-l-md bg-white"
                required
              >
                <option value="">Code</option>
                {COUNTRY_CODES.map((c, idx) => (
                  <option key={idx} value={c.code}>
                    {c.code} ({c.name})
                  </option>
                ))}
              </select>
              <Input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10 digits"
                className="h-9 rounded-l-none"
                required
              />
            </div>
            {formData.phone && !isValidPhone() && (
              <p className="text-xs text-red-500 mt-1">Must be exactly 10 digits</p>
            )}
          </div>

          {/* Service */}
          <div>
            <Label className="text-sm">Service</Label>
            <select
              name="service"
              value={formData.service}
              onChange={handleSelectChange}
              className="w-full h-9 px-3 border rounded-md bg-white"
              required
            >
              <option value="">Select a service</option>
              <option value="tally-cloud">Tally Cloud</option>
              <option value="erp-implementation">ERP Implementation</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          {/* Question (Optional) */}
          <div>
            <Label className="text-sm">Question</Label>
            <Textarea name="question" value={formData.question} onChange={handleChange} rows={3} />
          </div>

          {/* Submit */}
          <Button type="submit" disabled={isSubmitting || !canSubmit} className="w-full bg-blue-600 text-white">
            {isSubmitting ? "Sending..." : "Submit Now"}
          </Button>
        </form>
      </div>

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Thank You for Your Submission!"
        message="We will reach out to you within 24 hours."
        type="demo"
      />
    </>
  );
};

export default FreeDemoForm;
