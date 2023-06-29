import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RulesModule } from './rules/rules.module';
import { InstrumentsModule } from './instruments/instruments.module';
import { UserInstruModule } from './user-instru/user-instru.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompositorsModule } from './compositors/compositors.module';
import { ArrangorsModule } from './arrangors/arrangors.module';
import { StylesModule } from './styles/styles.module';
import { LibrariesModule } from './libraries/libraries.module';
import { BooksModule } from './books/books.module';
import { PartsModule } from './parts/parts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // type of our database
      host: 'localhost', // database host
      port: 5432, // database host
      username: 'postgres', // username
      password: '41474', // user password
      database: 'rfo', // name of our database,
      autoLoadEntities: true, // models will be loaded automatically
      synchronize: true, // your entities will be synced with the database(recommended: disable in prod)
    }),
    ConfigModule.forRoot(),
    UsersModule,
    RulesModule,
    InstrumentsModule,
    UserInstruModule,
    AuthModule,
    CompositorsModule,
    ArrangorsModule,
    StylesModule,
    LibrariesModule,
    BooksModule,
    PartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
