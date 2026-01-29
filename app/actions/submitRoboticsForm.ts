"use server";

import { z } from "zod";

type FormResult =
  | { success: true; message: string }
  | { success: false; fieldErrors: Record<string, string> };

const roboticsFormSchema = z.object({
  Name: z.string().min(1, "Name is required"),
  Email: z.string().email("Invalid email address"),
  Phone: z.string().min(1, "Phone is required"),
  Experience: z.string().min(10, "Please share more about your experience (at least 10 characters)"),
  Achievements: z.string().min(10, "Please share more about your achievements (at least 10 characters)"),
  Interests: z.string().min(10, "Please share more about what excites you (at least 10 characters)"),
  Benefits: z.string().min(10, "Please share more about what you hope to gain (at least 10 characters)"),
  Links: z.string().optional(),
});

export async function submitRoboticsForm(formData: FormData): Promise<FormResult> {
  try {
    const validatedFields = roboticsFormSchema.parse({
      Name: formData.get("name"),
      Email: formData.get("email"),
      Phone: formData.get("phone"),
      Experience: formData.get("experience"),
      Achievements: formData.get("achievements"),
      Interests: formData.get("interests"),
      Benefits: formData.get("benefits"),
      Links: formData.get("links") || "",
    });

    const APPSHEET_APPLICATION_ID = process.env.APPSHEET_APPLICATION_ID;
    const APPSHEET_API_KEY = process.env.APPSHEET_API_KEY;
    const TABLE_NAME = process.env.APPSHEET_ROBOTICS_TABLE_NAME;

    if (!APPSHEET_APPLICATION_ID || !APPSHEET_API_KEY || !TABLE_NAME) {
      throw new Error("Configuration error. Please contact support.");
    }

    const body = JSON.stringify({
      "Action": "Add",
      "Rows": [{
        "Name": validatedFields.Name,
        "Email": validatedFields.Email,
        "Phone": validatedFields.Phone,
        "Experience": validatedFields.Experience,
        "Achievements": validatedFields.Achievements,
        "Interests": validatedFields.Interests,
        "Benefits": validatedFields.Benefits,
        "Links": validatedFields.Links,
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

    return { success: true, message: "Thanks for your interest! I'll review your submission soon." };
  } catch (error) {
    console.error("Form submission error:", error);

    if (error instanceof z.ZodError) {
      const fieldErrors: Record<string, string> = {};
      error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      return { success: false, fieldErrors };
    }

    throw error;
  }
}
