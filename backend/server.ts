import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// === Middlewares ===
app.use(helmet());
app.use(express.json());

// Restrict to frontend domain in production, allowing local dev for now
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? ['https://personal-portfolio-pi-ten-48.vercel.app'] : '*',
}));

// === Routes ===

// 1. Get all Experiences
app.get('/api/experiences', async (req: Request, res: Response) => {
    try {
        const experiences = await prisma.experience.findMany({
            orderBy: {
                startDate: 'desc',
            },
        });
        res.json(experiences);
    } catch (error) {
        console.error('Error fetching experiences:', error);
        res.status(500).json({ error: 'Failed to fetch experiences' });
    }
});

// 2. Get all Projects
app.get('/api/projects', async (req: Request, res: Response) => {
    try {
        const projects = await prisma.project.findMany({
            orderBy: {
                order: 'asc',
            },
        });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});



// === Start Server ===
app.listen(PORT, () => {
    console.log(`🚀 Premium Portfolio API is running on http://localhost:${PORT}`);
});
