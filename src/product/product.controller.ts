import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import {
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiProduces,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { ProductResponseDTO } from './dto/product.response.dto';
import { UpdateProductDTO } from './dto/update.product.dto';

@ApiTags('Product')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiProduces('application/json')
  @ApiBody({
    description: 'Payload for creating new product',
    type: CreateProductDto,
    examples: {
      example: {
        summary: 'Create a single product',
        value: {
          name: 'Laptop',
          desc: 'High-end laptop for gaming and development',
          price: 8000000,
          image: 'laptop.jpg',
          category: 'electronics',
        },
      },
      exampleWithoutDesc: {
        summary: 'Create a single product without description',
        value: {
          name: 'Laptop',
          price: 8000000,
          image: 'laptop.jpg',
          category: 'electronics',
        },
      },
    },
  })
  @ApiOkResponse({
    type: ProductResponseDTO,
    description: 'Product Created successfully',
    example: {
      data: {
        id: 1,
        name: 'Laptop',
        desc: 'High model for gaming laptop',
        price: 6000000,
        category: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal Server Error',
    example: {
      data: {
        statusCode: 500,
        message: 'An error occured',
        error: 'Internal Server Error',
      },
    },
  })
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Get()
  @ApiQuery({
    name: 'category',
    type: 'string',
    description: 'filter products by category',
    example: 'electronics',
  })
  @ApiOkResponse({
    type: ProductResponseDTO,
    description: 'Products Retrieved successfully',
    example: {
      data: {
        id: 1,
        name: 'Laptop',
        desc: 'High model for gaming laptop',
        price: 6000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    example: {
      data: {
        statusCode: 404,
        message: 'An error occured',
        error: 'Product not found',
      },
    },
  })
  findProductsByCategory(@Query('category') category: string) {
    return this.productService.findProductsByCategory(category);
  }

  @Get(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique identifier of the product',
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    type: ProductResponseDTO,
    description: 'Product Retrieve successfully',
    example: {
      data: {
        id: 1,
        name: 'Laptop',
        desc: 'High model for gaming laptop',
        price: 6000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    example: {
      data: {
        statusCode: 404,
        message: 'An error occured',
        error: 'Product not found',
      },
    },
  })
  findProductById(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique identifier of the product',
    required: true,
    example: 1,
  })
  @ApiBody({
    description: 'Payload for update attribute of product',
    type: UpdateProductDTO,
    examples: {
      example: {
        summary: 'Update a single product',
        value: {
          name: 'ASUS Vivobook',
          desc: 'High-end laptop for Software Engineering',
          price: 8600000,
          image: 'vivobook.jpg',
          category: 'electronics',
        },
      },
    },
  })
  @ApiOkResponse({
    type: ProductResponseDTO,
    description: 'Product updated successfully',
    example: {
      data: {
        id: 1,
        name: 'ASUS Vivobook',
        desc: 'High-end laptop for Software Engineering',
        price: 8600000,
        image: 'vivobook.jpg',
        category: 'electronics',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    example: {
      data: {
        statusCode: 404,
        message: 'An error occured',
        error: 'Product not found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error which caused that the user is not permitted',
    example: {
      data: {
        statusCode: 500,
        message: 'An error occured',
        error: 'You do not have any permission to update this product',
      },
    },
  })
  update(@Param('id') id: number, @Body() updateProductDTO: UpdateProductDTO) {
    return this.productService.update(+id, updateProductDTO);
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'The unique identifier of the product',
    required: true,
    example: 1,
  })
  @ApiOkResponse({
    description: 'Product deleted successfully',
    example: {
      data: { statusCode: 200, message: 'Product deleted successfully' },
    },
  })
  @ApiNotFoundResponse({
    description: 'Product not found',
    example: {
      data: {
        statusCode: 404,
        message: 'An error occured',
        error: 'Product not found',
      },
    },
  })
  @ApiInternalServerErrorResponse({
    description: 'Error which caused that the user is not permitted',
    example: {
      data: {
        statusCode: 500,
        message: 'An error occured',
        error: 'You do not have any permission to delete this product',
      },
    },
  })
  delete(@Param('id') id: number) {
    return this.productService.delete(+id);
  }
}
