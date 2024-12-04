import validator from "validator";
import bcrypt from "bcrypt";
import { prisma } from "../database";

export const signup = async (req: any, res: any) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required")
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please provide a valid email");
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      throw new Error("user already exist");
    }

    user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 12),
      },
    });

    res
      .status(201)
      .json({ status: "success", message: "you signed up successfully", user });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).status({ message: "server error" });
  }
};

export const login = async (req:any, res:any) => {
  try {
    const {email, password} = req.body;

    if (!email || !password) {
      throw new Error("All fields are required")
    }

    if (!validator.isEmail(email)) {
      throw new Error("Please provide a valid email")
    }

    let user = await prisma.user.findUnique({
      where: {email}
    })

    if (!user) {
      throw new Error("user doesn't exist")
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Error('bad credentials')
    }

    res.status(200).json({
      status: 'success',
      message: 'you are logged in'
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({status: 'error', message: error.message})
  }
}

export const getUser = async (req: any, res: any) => {
  try {
    const {id} = req.params
    const user = await prisma.user.findUnique({
      where: {id},
      select: {
        firstName: true,
        lastName: true,
        email: true,
        tasks: {select: {title: true, description: true, priority: true, status: true}}
      }
    })

    if (!user) {
      throw new Error("User doesn't exist")
    }

    res.status(200).json({
      status: 'success',
      user
    })
  } catch (error: any) {
    console.log(error.message)
    res.status(500).json({status: 'error', message: error.message})
  }
}