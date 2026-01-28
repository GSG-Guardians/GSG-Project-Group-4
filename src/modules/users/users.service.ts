import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../../database/entities/user.entities';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) { }

    async searchUsers(name?: string) {
        if (!name) {
            return [];
        }

        const query = this.userRepository
            .createQueryBuilder('user')
            .where('user.full_name ILIKE :name', { name: `%${name}%` })
            .orWhere('user.email ILIKE :name', { name: `%${name}%` })
            .orderBy('user.full_name', 'ASC')
            .limit(20);

        const users = await query.getMany();
        return users.map((user) => ({
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            avatarAssetId: user.avatarAssetId,
        }));
    }
}
