import { Request, Response } from 'express';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { container } from 'tsyringe';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    console.log('comit template');

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    const userWithoutPassword = {
      id: user.id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      updated_at: user.updated_at,
      created_at: user.created_at,
    };

    return response.json(userWithoutPassword);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, old_password, password } = request.body;
    const user_id = request.user.id;

    const createUser = container.resolve(UpdateProfileService);

    await createUser.execute({
      user_id,
      name,
      email,
      old_password,
      password,
    });

    const userWithoutPassword = {
      id: user_id,
      name,
      email,
      old_password,
      password,
    };

    return response.json(userWithoutPassword);
  }
}
