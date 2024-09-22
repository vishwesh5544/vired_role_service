import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Permission } from 'src/enums';

export type RoleDocument = Role & Document;

@Schema({ timestamps: true })
export class Role {
  @Prop({ required: true, unique: true })
  name: string;

  // Assigning all permissions by default
  @Prop({
    type: [String],
    enum: Permission,
    default: Object.values(Permission),
  })
  permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
