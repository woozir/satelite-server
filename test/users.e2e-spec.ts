import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './../src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

describe('UsersController (e2e)', () => {
  const user = {
    username: 'toto',
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'pass123',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/users (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .expect(200)
      .expect([]);
  });

  it('/users (POST)', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/users')
      .send(user as CreateUserDto)
      .expect(HttpStatus.CREATED);
    expect(body.username).toEqual('toto');
  });
  afterAll(async () => {
    await app.close();
  });
});
