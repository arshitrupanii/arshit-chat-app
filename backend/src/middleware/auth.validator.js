import { body, validationResult } from "express-validator";

const validateUser = [
    body("firstname")
        .trim()
        .notEmpty().withMessage("firstname is required")
        .isLength({ min: 4 }).withMessage("firstname at least 4 characters")
        .isLength({ max: 20 }).withMessage("firstname less than 20 characters"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format"),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),


    (req, res, next) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        next();
    }
];

export default validateUser;
