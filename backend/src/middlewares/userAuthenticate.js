const zod = require("zod");

// Schemas
const usernameschema = zod.string().email({ message: "Invalid Email Address" });
const passwordSchema = zod.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .max(16, { message: "Password must be at most 16 characters long" })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one number",
  })
  .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
    message: "Password must contain at least one special character",
  });

// Middleware function
function userinputvalidator(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;

  // Validate username
  const userstatus = usernameschema.safeParse(username);
  if (!userstatus.success) {
    return res.status(400).json({ errors: userstatus.error.errors });
  }

  // Validate password
  const passtatus = passwordSchema.safeParse(password);
  if (!passtatus.success) {
    return res.status(400).json({ errors: passtatus.error.errors });
  }

  // If both validations pass, move to the next middleware
  next();
}

module.exports = userinputvalidator;
