import { validate } from "class-validator";
import { Request, Response, Router } from "express";
import { User } from "../entities/User";

const register = async (req: Request, res: Response) => {
    const { mobile, name, email } = req.body;

    try {
        // validate received data
        let errors: any = {};
        const emailUser = await User.findOne({ email });
        const mobileUser = await User.findOne({ mobile });

        if (emailUser) errors.email = "Email is already taken";
        if (mobileUser) errors.mobile = "Mobile number is already in use";

        if (Object.keys(errors).length > 0) {
            return res.status(400).json(errors);
        }

        const user = new User({ mobile, name, email });

        errors = await validate(user);
        if (errors.length > 0) {
            return res.status(400).json({ errors });
        }

        await user.save();

        return res.status(201).json(user);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

const router = Router();

router.post("/register", register);

export default router;
