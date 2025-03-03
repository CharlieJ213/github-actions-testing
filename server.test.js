import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from './server';

vi.stubGlobal('fetch', vi.fn());

describe('Server', () => {
    it('should be running', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(404); // Since there is no GET endpoint, it should return 404
    });

    describe('POST /log', () => {
        it('should send log data to ELK stack successfully', async () => {
            fetch.mockResolvedValue(new Response(null, { status: 200 }));

            const logData = { message: 'Test log message' };
            const response = await request(app)
                .post('/log')
                .send(logData)
                .set('Accept', 'application/json');

            expect(response.status).toBe(200);
            expect(response.text).toBe('Log data sent to ELK stack');
        });

        it('should handle error when sending log data to ELK stack fails', async () => {
            fetch.mockResolvedValue(new Response(null, { status: 500 }));

            const logData = { message: 'Test log message' };
            const response = await request(app)
                .post('/log')
                .send(logData)
                .set('Accept', 'application/json');

            expect(response.status).toBe(500);
            expect(response.text).toBe('Error sending log data to ELK stack');
        });

        it('should handle network error when ELK stack is unreachable', async () => {
            fetch.mockRejectedValue(new Error('Network response was not ok'));

            const logData = { message: 'Test log message' };
            const response = await request(app)
                .post('/log')
                .send(logData)
                .set('Accept', 'application/json');

            expect(response.status).toBe(500);
            expect(response.text).toBe('Error sending log data to ELK stack');
        });
    });
});