import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Authentication System', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST)', () => {
    const emailSent = 'asdzxddcrra123@qweasd.com';

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({email: emailSent, password: '123456'})
      .expect(201)
      .then((response) => {
        const { id, email } = response.body;
        expect(id).toBeDefined();
        expect(email).toEqual(emailSent);
      });
  });

  it('/auth/signin (POST) then /auth/whoami (GET)', async () => {
    const emailSent = 'aaa@ddd.com';

    const signUpRequest = await request(app.getHttpServer())
      .post('/auth/signup')
      .send({email: emailSent, password: 'asdfg'})
      .expect(201);

    const cookie = signUpRequest.get('Set-Cookie');

    const {body} = await request(app.getHttpServer())
      .get('/auth/whoami')
      .set('Cookie', cookie)
      .expect(200);

    expect(body.email).toEqual(emailSent);
  });
});
