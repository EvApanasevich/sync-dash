import { Controller, Get, Render, Res } from "@nestjs/common";
import { Response } from "express";

@Controller("*")
export class NotFoundController {
  @Get()
  notFound(@Res() res: Response) {
    return res.redirect("/");
  }
}
