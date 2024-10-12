import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    type: Number,
    description: 'Unique Id of the product',
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Name of the product',
    example: 'Laptop',
  })
  name: string;

  @ApiPropertyOptional({
    type: String,
    description: 'Description about the product',
    example: 'A high-performance laptop suitable for gaming and work.',
    readOnly: true,
  })
  desc?: string;

  @ApiProperty({
    type: Number,
    description: 'Price of product',
    example: 8000000,
  })
  price: number;

  @ApiPropertyOptional({
    type: String,
    description: 'Image of the product',
    example: 'product-image.jpg',
    format: 'binary',
  })
  image?: string;

  @ApiPropertyOptional({
    type: String,
    description: 'category of the product',
    example: 'electronics',
  })
  category?: string;

  @ApiProperty({
    type: Date,
    description: 'The date and time product was created',
    default: new Date(),
    example: '2024-10-08T10:20:30Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    description: 'The date and time product was updated',
    example: '2024-10-09T10:20:30Z',
  })
  updatedAt: Date;
}
