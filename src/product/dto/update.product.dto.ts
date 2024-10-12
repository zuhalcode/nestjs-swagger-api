import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { CreateProductDto } from './create-product.dto';

export class UpdateProductDTO extends PartialType(CreateProductDto) {
  @ApiPropertyOptional({
    type: String,
    description: 'Name of the product',
    example: 'Laptop',
  })
  name?: string;
  @ApiPropertyOptional({
    type: String,
    description: 'Description about the product',
    example: 'A high-performance laptop suitable for gaming and work.',
    readOnly: true,
  })
  desc?: string;

  @ApiPropertyOptional({
    type: Number,
    description: 'Price of product',
    example: 8000000,
  })
  price?: number;

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
}
