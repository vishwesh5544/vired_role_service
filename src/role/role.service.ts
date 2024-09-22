import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/models';

@Injectable()
export class RoleService {
  constructor(@InjectModel(Role.name) private roleModel: Model<RoleDocument>) {}

  // Create a new role with default permissions if not provided
  async createRole(name: string, permissions: Permissions[] = Object.values(Permissions)): Promise<Role> {
    const newRole = new this.roleModel({ name, permissions });
    return newRole.save();
  }

  // Find all roles
  async findAll(): Promise<Role[]> {
    return this.roleModel.find().exec();
  }

  // Find a role by ID
  async findById(id: string): Promise<Role> {
    const role = await this.roleModel.findById(id).exec();
    if (!role) {
      throw new NotFoundException('Role not found');
    }
    return role;
  }

  // Update a role by ID
  async updateRole(id: string, name: string, permissions: Permissions[]): Promise<Role> {
    const updatedRole = await this.roleModel.findByIdAndUpdate(id, { name, permissions }, { new: true }).exec();
    if (!updatedRole) {
      throw new NotFoundException('Role not found');
    }
    return updatedRole;
  }

  // Delete a role by ID
  async deleteRole(id: string): Promise<void> {
    const result = await this.roleModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Role not found');
    }
  }
}
