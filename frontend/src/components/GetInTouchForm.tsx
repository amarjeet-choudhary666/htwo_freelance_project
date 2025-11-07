import { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import SuccessPopup from "./SuccessPopup";
import emailjs from "@emailjs/browser";

export const GetinTouch = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    service: "",
    question: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const phoneDigits = value.replace(/\D/g, ''); // Only digits
      setFormData((prev) => ({ ...prev, phone: phoneDigits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const isValidPhone = () => formData.phone.length === 10;

  const getFormattedPhone = () => {
    if (!formData.country || !formData.phone) return "";
    return `${formData.country}${formData.phone}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidPhone()) return;

    setIsSubmitting(true);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_GET_IN_TOUCH_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: getFormattedPhone(),
          country: formData.country,
          service: formData.service,
          message: formData.question,
          to_name: "Htwo Team",
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_API
      );

      setShowSuccessPopup(true);
      setFormData({ name: "", email: "", phone: "", country: "", service: "", question: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-white text-black p-8 rounded-2xl shadow-2xl mx-auto font-poppins border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Get In Touch</h2>
        <p className="text-center text-gray-500 mb-8 text-sm md:text-base">
          We would love to hear from you! Fill out the form below and our team will reach out shortly.
        </p>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
            </div>

            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required />
            </div>
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <div className="flex">
              <select
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-24 px-2 py-2 text-sm border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white border-r-0"
                required
              >
                <option value="">Code</option>
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+61">+61</option>
                <option value="+49">+49</option>
                <option value="+33">+33</option>
                <option value="+81">+81</option>
                <option value="+65">+65</option>
              </select>
              <Input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                className="rounded-l-none border-l-0"
                maxLength={10}
                required
              />
            </div>

            {formData.phone && !isValidPhone() && (
              <p className="text-xs text-red-500 mt-1">Phone number must be exactly 10 digits</p>
            )}
            {isValidPhone() && formData.country && (
              <p className="text-xs text-green-500 mt-1">Complete number: {getFormattedPhone()}</p>
            )}
          </div>

          <div>
            <Label htmlFor="service">Select Service</Label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              className="w-full h-9 px-2 border rounded-md bg-white"
              required
            >
              <option value="">Choose an option</option>
              <option value="tally-cloud">Tally Cloud</option>
              <option value="erp-implementation">ERP Implementation</option>
              <option value="consultation">Consultation</option>
            </select>
          </div>

          <div>
            <Label htmlFor="question">Message / Question</Label>
            <Textarea
              id="question"
              name="question"
              value={formData.question}
              onChange={handleChange}
              placeholder="Tell us how we can help..."
              rows={4}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || !isValidPhone()}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow-md disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Submit Message"}
          </Button>
        </form>
      </div>

      <SuccessPopup
        isOpen={showSuccessPopup}
        onClose={() => setShowSuccessPopup(false)}
        title="Thank You for Your Submission!"
        message="We will reach out to you within 24 hours."
        type="contact"
      />
    </>
  );
};
