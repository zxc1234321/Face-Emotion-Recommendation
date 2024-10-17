import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export namespace AuthDto {
  export class SignUp {
    @IsEmail({}, {message: '올바른 이메일 형식이어야 합니다.'})
    email: string;

    @IsNotEmpty({message: '비밀번호는 필수 항목입니다.'})
    @IsString({message: '비밀번호는 문자열이어야 합니다.'})
    @Length(8, 16, {message: '비밀번호는 최소 8자 이상이어야 합니다.'})
    password: string;
  }

  export class SignIn {
    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 16)
    password: string;
  }
}