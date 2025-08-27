"use server";

import { z } from "zod";

const formSchema = z.object({
  Book: z.string().min(1, "Book/Article/Podcast recommendation is required"),
  Why: z.string().min(1, "Please share what sparked your interest"),
  Email: z.string().email("Invalid email address"),
  Phone: z.string().optional(),
});

export async function submitForm(formData: FormData) {
  try {
    const validatedFields = formSchema.parse({
      Book: formData.get("book"),
      Why: formData.get("interest"),
      Email: formData.get("email"),
      Phone: formData.get("phone") || "",
    });

    const APPSHEET_APPLICATION_ID = process.env.APPSHEET_APPLICATION_ID;
    const APPSHEET_API_KEY = process.env.APPSHEET_API_KEY;
    const TABLE_NAME = process.env.APPSHEET_TABLE_NAME;

    if (!APPSHEET_APPLICATION_ID || !APPSHEET_API_KEY || !TABLE_NAME) {
      throw new Error("Configuration error. Please contact support.");
    }

    const body = JSON.stringify({
      "Action": "Add",
      "Rows": [{
        "Book": validatedFields.Book,
        "Why": validatedFields.Why,
        "Email": validatedFields.Email,
        "Phone": validatedFields.Phone,
      }],
    });

    const response = await fetch(
      `https://api.appsheet.com/api/v2/apps/${APPSHEET_APPLICATION_ID}/tables/${TABLE_NAME}/Action`,
      {
        method: "POST",
        headers: {
          applicationAccessKey: APPSHEET_API_KEY,
          "Content-Type": "application/json",
        },
        body,
      }
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("API error:", response.status, errorText);
      throw new Error("Failed to submit form. Please try again later.");
    }

    return { success: true, message: "Your note is in - I'll get back soon" };
  } catch (error) {
    console.error("Form submission error:", error);
    throw error;
  }
}
