// PUt all imports and types
import * as z from "zod";
export const FormSchema = z.object({
  message: z.string().min(1, {
    message: "This cannot be empty",
  }),
});
