import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthResponseSwaggerDto,
  SignUpRequestSwaggerDto,
  SignInRequestSwaggerDto,
  type TSignUpRequest,
  type TSignInRequest,
} from './dto';
import { ZodValidationPipe } from 'src/pipes/zodValidation.pipe';
import { SignUpSchema, SignInSchema } from './schemas/auth.schema';
import { ApiBody } from '@nestjs/swagger';
import { ApiSuccess } from 'src/helpers/swaggerDTOWrapper.helpers';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @ApiBody({ type: SignUpRequestSwaggerDto })
  @ApiSuccess(AuthResponseSwaggerDto)
  signUp(@Body(new ZodValidationPipe(SignUpSchema)) data: TSignUpRequest) {
    return this.authService.signUp(data);
  }

  @Post('sign-in')
  @ApiBody({ type: SignInRequestSwaggerDto })
  @ApiSuccess(AuthResponseSwaggerDto)
  signIn(@Body(new ZodValidationPipe(SignInSchema)) data: TSignInRequest) {
    return this.authService.signIn(data);
  }
}
