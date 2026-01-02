// import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { MailerModule } from './user/mailer.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { StatsModule } from './stats/stats.module';
// import { CategoryModule } from './category/category.module';

// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'postgres',
//       host: 'localhost',
//       port: 5432,
//       username: 'postgres', // mandatory
//       password: 'Qwe345rt@',
//       database: 'LoginSystem',
//       entities: [__dirname + '/**/*.entity{.ts,.js}'],
//       synchronize: true,
//     }),
//     UserModule,
//     AuthModule,
//     MailerModule,
//     ProductModule,
//     OrderModule,
//     StatsModule,
//     CategoryModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }


// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ConfigModule, ConfigService } from '@nestjs/config';

// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { MailerModule } from './user/mailer.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { StatsModule } from './stats/stats.module';
// import { CategoryModule } from './category/category.module';

// @Module({
//   imports: [
//     // 🔹 ENV variables load (DATABASE_URL)
//     ConfigModule.forRoot({
//       isGlobal: true,
//     }),

//     // 🔹 PostgreSQL (Railway / Cloud)
//     // 🔹 PostgreSQL (Railway / Cloud)
//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => {
//         const dbUrl = configService.get<string>('DATABASE_URL');

//         // Check if DB URL is valid and accessible (e.g. not internal Railway DNS)
//         if (dbUrl && !dbUrl.includes('railway.internal')) {
//           const isLocal = dbUrl.includes('localhost') || dbUrl.includes('127.0.0.1');
//           return {
//             type: 'postgres',
//             url: dbUrl,
//             autoLoadEntities: true,
//             synchronize: true, // ⚠️ TEMPORARY (tables create karne ke liye)
//             ssl: isLocal ? false : {
//               rejectUnauthorized: false,
//             },
//           };
//         }

//         // Fallback to local defaults if DATABASE_URL is missing
//         return {
//           type: 'postgres',
//           host: 'localhost',
//           port: 5432,
//           username: 'postgres',
//           password: 'Qwe345rt@',
//           database: 'LoginSystem',
//           autoLoadEntities: true,
//           synchronize: true,
//           ssl: false,
//         };
//       },
//     }),

//     // 🔹 Application Modules
//     UserModule,
//     AuthModule,
//     MailerModule,
//     ProductModule,
//     OrderModule,
//     StatsModule,
//     CategoryModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }

// import { Module } from '@nestjs/common';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { UserModule } from './user/user.module';
// import { AuthModule } from './auth/auth.module';
// import { MailerModule } from './user/mailer.module';
// import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { StatsModule } from './stats/stats.module';
// import { CategoryModule } from './category/category.module';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';

// @Module({
//   imports: [
//     ConfigModule.forRoot({
//       isGlobal: true, // accessible everywhere
//     }),

//     TypeOrmModule.forRootAsync({
//       imports: [ConfigModule],
//       inject: [ConfigService],
//       useFactory: (configService: ConfigService) => ({
//         type: 'postgres',
//         url: configService.get<string>('DATABASE_URL'), // Railway DB URL
//         autoLoadEntities: true, // auto load all entities
//         synchronize: true, // auto create tables
//       }),
//     }),

//     UserModule,
//     AuthModule,
//     MailerModule,
//     ProductModule,
//     OrderModule,
//     StatsModule,
//     CategoryModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
// export class AppModule { }



import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MailerModule } from './user/mailer.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { StatsModule } from './stats/stats.module';
import { CategoryModule } from './category/category.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // accessible everywhere
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: { rejectUnauthorized: false }, // Important for Railway
      }),
    }),

    UserModule,
    AuthModule,
    MailerModule,
    ProductModule,
    OrderModule,
    StatsModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
