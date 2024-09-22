import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from 'src/models';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  // Create a new role
  @Post()
  async create(
    @Body('name') name: string, 
    @Body('permissions') permissions: Permissions[],
  ): Promise<Role> {
    return this.roleService.createRole(name, permissions);
  }

  // Get all roles
  @Get()
  async findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  // Get role by ID
  @Get(':id')
  async findById(@Param('id') id: string): Promise<Role> {
    return this.roleService.findById(id);
  }

  // Update role by ID
  @Patch(':id')
  async updateRole(
    @Param('id') id: string, 
    @Body('name') name: string, 
    @Body('permissions') permissions: Permissions[],
  ): Promise<Role> {
    return this.roleService.updateRole(id, name, permissions);
  }

  // Delete role by ID
  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.roleService.deleteRole(id);
  }
}
