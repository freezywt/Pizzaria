import prismaClient from '../../prisma';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

interface AuthRequest {
  email: string,
  password: string,
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
      }
    })

    if (!user) {
      throw new Error('User/password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('User/password incorrect')
    }

    const token = sign(
      {
        name: user.name,
        email: user.email,
      },
      'e10adc3949ba59abbe56e057f20f883e', // generate token in https://www.md5hashgenerator.com/
      {
        subject: user.id,
        expiresIn: '30d',
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      token,
    }
  }
}

export { AuthUserService };
