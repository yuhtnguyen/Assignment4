import { ApiPropertyOptional } from "@nestjs/swagger";

export class UpdateUserDto {
  @ApiPropertyOptional({ description: 'Full name of the user' })
  fullName: string;
}