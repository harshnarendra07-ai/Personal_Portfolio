import express, { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import nodemailer from 'nodemailer';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// === Middlewares ===
app.use(helmet());
app.use(express.json());

// Restrict to frontend domain in production, allowing local dev for now
app.use(cors({
    origin: '*', // CHANGE THIS: to 'http://your-frontend-domain.com' in production
}));

// Rate limiter specifically for contact form to prevent spam
const contactRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Limit each IP to 5 requests per `window`
    message: { error: 'Too many requests from this IP, please try again after 15 minutes' },
});

// === Schemas ===
const contactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

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

// 3. Post Contact Form
app.post('/api/contact', contactRateLimiter, async (req: Request, res: Response): Promise<void> => {
    try {
        // Validate payload using Zod
        const validatedData = contactSchema.parse(req.body);

        // 1. Save to Database
        const newMessage = await prisma.message.create({
            data: {
                name: validatedData.name,
                email: validatedData.email,
                content: validatedData.message,
            }
        });

        // 2. Send Email
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || 'smtp.gmail.com',
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
            to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
            subject: `New Message from ${validatedData.name}`,
            text: `You have received a new contact submission.\n\nName: ${validatedData.name}\nEmail: ${validatedData.email}\n\nMessage:\n${validatedData.message}`,
            html: `
                <h3>New Portfolio Contact</h3>
                <p><strong>Name:</strong> ${validatedData.name}</p>
                <p><strong>Email:</strong> ${validatedData.email}</p>
                <p><strong>Message:</strong></p>
                <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
            `,
        });

        res.status(201).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({ error: error.errors });
            return;
        }
        console.error('Contact Form Error:', error);
        res.status(500).json({ error: 'Internal server error while processing message' });
    }
});

// === Start Server ===
app.listen(PORT, () => {
    console.log(`🚀 Premium Portfolio API is running on http://localhost:${PORT}`);
});
