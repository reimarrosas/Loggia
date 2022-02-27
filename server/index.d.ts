import express from 'express';

declare global {
  namespace Express {
    interface Request {
      credentials: {
        userId: number;
        userName: string;
        userEmail: string;
      };
    }
  }
}
