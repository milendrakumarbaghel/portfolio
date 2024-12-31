import { useState } from 'react';
import { Send } from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement email sending logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <article>
      <h2 className="text-3xl text-white font-semibold mb-8 pb-2 border-b-2 border-[#ffd700] w-fit">
        Contact
      </h2>

      <div className="max-w-2xl mx-auto">
        <h3 className="text-2xl text-white font-medium mb-6 text-center">
          Contact Form
        </h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="fullname"
              placeholder="Full name"
              required
              value={formData.fullname}
              onChange={handleChange}
              className="bg-transparent text-white border border-[#2b2b2b] rounded-xl px-5 py-3 focus:border-[#ffd700] outline-none"
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent text-white border border-[#2b2b2b] rounded-xl px-5 py-3 focus:border-[#ffd700] outline-none"
            />
          </div>

          <textarea
            name="message"
            placeholder="Your Message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="w-full bg-transparent text-white border border-[#2b2b2b] rounded-xl px-5 py-3 focus:border-[#ffd700] outline-none resize-none"
          />

          <div className="flex justify-center">
            <button
              type="submit"
              className="flex items-center gap-2 bg-[#2b2b2b] text-[#ffd700] px-6 py-3 rounded-xl hover:bg-[#363636] transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </div>
        </form>
      </div>
    </article>
  );
};
