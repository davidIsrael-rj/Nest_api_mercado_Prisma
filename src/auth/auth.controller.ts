import { BadRequestException, Body, Controller, FileTypeValidator, Headers, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";
import { AuthForgetDTO } from "./dto/auth-forget.dto";
import { AuthResetDTO } from "./dto/auth-reset.dto";
import { UserService } from "../user/user.service";
import { AuthService } from "./auth.service";
import { AuthMeDTO } from "./dto/auth-me.dto";
import { AuthGuard } from "../guards/auth.guard";
import { User } from "../decorators/user.decorator";
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { writeFile } from "fs/promises";
import { join } from 'path';
import { FileService } from "../file/file.service";

@Controller('auth')
export class AuthController {

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
        private readonly fileService: FileService,
    ) { }

    @Post('login')
    async login(@Body() { email, password }: AuthLoginDTO) {
        return this.authService.login(email, password)

    }

    @Post('register')
    async register(@Body() body: AuthRegisterDTO) {
        return this.authService.register(body);
    }

    @Post('forget')
    async forget(@Body() { email }: AuthForgetDTO) {
        return this.authService.forget(email);
    }

    @Post('reset')
    async reset(@Body() { password, token }: AuthResetDTO) {
        return this.authService.reset(password, token);
    }

    @UseGuards(AuthGuard)
    @Post('me')
    async me(@User() user) {
        return { user };
    }

    @UseInterceptors(FileInterceptor('file'))
    @UseGuards(AuthGuard)
    @Post('photo')
    async uploadPhoto(
        @User() user,
        @UploadedFile(new ParseFilePipe({
            validators:[
                new FileTypeValidator({fileType:'image/webp'}),
                // new MaxFileSizeValidator({maxSize:1024 * 97})
                new MaxFileSizeValidator({maxSize:98513})
                //98512
            ]
        })) photo: Express.Multer.File) {


        const path = join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`);
        const result = await writeFile(join(__dirname, '..', '..', 'storage', 'photos', `photo-${user.id}.png`), photo.buffer);

        try {
            await this.fileService.upload(photo, path);
        } catch (e) {
            throw new BadRequestException(e)
        }
        return { sucess: true, user, photo }
    }

    @UseInterceptors(FilesInterceptor('files'))
    @UseGuards(AuthGuard)
    @Post('files')
    async uploadFiles(@User() user, @UploadedFiles() files: Express.Multer.File[]) {
        return files
    }

    @UseInterceptors(FileFieldsInterceptor([{
        name:'photo',
        maxCount:1
    },{
        name: 'documents',
        maxCount: 10
    }]))
    @UseGuards(AuthGuard)
    @Post('files-fields')
    async uploadFilesFields(@User() user, @UploadedFiles() files: {photo: Express.Multer.File, documents:Express.Multer.File[]}){
        return files
    }
}