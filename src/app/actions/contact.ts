"use server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
}

export async function submitContactForm(
  formData: ContactFormData
): Promise<ContactResponse> {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return { success: false, message: "All fields are required." };
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return { success: false, message: "Please enter a valid email address." };
    }

    // Log the form data (replace with Nodemailer/Resend in production)
    console.log("=== New Contact Form Submission ===");
    console.log("Name:", formData.name);
    console.log("Email:", formData.email);
    console.log("Subject:", formData.subject);
    console.log("Message:", formData.message);
    console.log("==================================");

    // Simulate a small delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      success: true,
      message: "Thank you! Your message has been sent successfully.",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
    };
  }
}
