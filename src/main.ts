import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { engine } from 'express-handlebars';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { NotFoundFilter } from './filters/not-found.filter';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalFilters(new NotFoundFilter());

  app.use(cookieParser());
  app.use(
    session({
      secret: process.env.SECRET_SESSION,
      resave: false,
      saveUninitialized: false,
    }),
  );

  const hbs = engine({
    extname: '.hbs',
    defaultLayout: 'main',
    layoutsDir: join(__dirname, '..', 'views', 'layouts'),
    partialsDir: join(__dirname, '..', 'views', 'partials'),
    helpers: {
      // добавление хелперов сюда
      isNotEmpty: function (array, options) {
        if (array && array.length !== 0) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      },
      ifSystemNameEquals: function (systemName, value, options) {
        if (systemName === value) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      },
      ifCond: function (currentSystemName, systemName, options) {
        if (currentSystemName && currentSystemName === systemName) {
          return options.fn(this);
        } else {
          return options.inverse(this);
        }
      },
    },
  });

  app.engine('hbs', hbs);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
    .setTitle('Mechatronics Sync Dash')
    .setDescription('Server for data collection and transformation into the required format')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
}

start();
