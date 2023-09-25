import { Controller, Post, UploadedFile, UseGuards, UseInterceptors, Request, Get, Param, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadPipe } from './upload/upload.pipe';
import { UsersService } from './users.service';
import { UploadBannerPipe } from './upload/upload-banner.pipe';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    @UseGuards(AuthGuard('jwt'))
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadAvatar(@UploadedFile(UploadPipe) file: string, @Request() req: any) {
        await this.userService.updateAvatar(req.user.id, file);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('banner')
    @UseInterceptors(FileInterceptor('file'))
    async uploadBanner(@UploadedFile(UploadBannerPipe) file: string, @Request() req: any) {
        await this.userService.updateBanner(req.user.id, file);
    }

    @Get('avatars/:fileId')
    async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, {root: 'uploads/avatars'});
    }

    @Get('banner/:fileId')
    async serveBanner(@Param('fileId') fileId, @Res() res): Promise<any> {
        res.sendFile(fileId, {root: 'uploads/banners'});
    }

}
