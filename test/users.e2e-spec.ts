import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';


describe('UsersController (e2e)', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule], // Подключаем твой основной модуль
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/users (GET)', async () => {
        const response = await request(app.getHttpServer()).get('/usere');
        expect(response.status).toBe(200);
        // Можно добавить: expect(response.body).toEqual([...])
    });

    afterAll(async () => {
        await app.close();
    });
});
